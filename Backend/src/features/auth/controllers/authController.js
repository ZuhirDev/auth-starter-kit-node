import { createUserService, findUserByEmail, findUserById, oAuthService, updateUserById } from "#user/services/userService.js";
import { generateTempToken, generateToken, validateTempToken } from "#utils/jwt.js";
import bcrypt from 'bcryptjs';
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "#auth/validations/authValidation.js";
import { validateRequest } from "#utils/validation.js";
import { sendEmail } from "#config/mailer.js";
import CONFIG from "#config/config.js";
import { effectivePermissionsService } from "#admin/user/services/userPermissionService.js";
import jwt from 'jsonwebtoken';
import { logger } from "#admin/log/controllers/logController.js";
import { t } from "#utils/i18n/index.js";

export const register = async (req, res) => {
    try {
        const validation = await validateRequest(registerSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors })

        const { name, email, password } = validation.data;

        const existingUser = await findUserByEmail(email);
        if(existingUser) return res.status(409).json({ message: t('auth:userAlreadyExists') });

        const user = await createUserService({ name, email, password }); 
            
        await sendEmail({ 
            to: user.email, 
            subject: t('auth:welcomeSubject', { appName: CONFIG.APP_NAME }), 
            template: 'welcome', 
            context: {
                name: user.name,
                company: CONFIG.APP_NAME,
                url: CONFIG.FRONTEND_URL,
            } 
        });

        return res.status(201).json({ message: t('auth:userCreated') });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: t('auth:serverCreateUserError') });
    }
};

export const oAuth = async (req, res) => {
    const { provider, credential } = req.body;

    try {
        const { user, permissions } = await oAuthService({ provider, token: credential });

        const token = generateToken({
            id: user.id,
            permissions: Array.from(permissions.keys()),
        },  
            CONFIG.JWT_SECRET,
            '30m'
        );

        const refreshToken = generateToken({
            id: user._id,
            type: 'refresh',
        },  
            CONFIG.JWT_REFRESH_SECRET,
            '7d'
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 30 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        await logger({
            user_id: user.id,
            action: 'loginOAuth',
            module: 'auth',
            ip_address: req.ip,
        });
        
        return res.status(200).json({ message: t('auth:loginSuccessful') });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: t('auth:loginOAuthError') });
    }
};

export const login = async (req, res) => {
    try {
        const validation = await validateRequest(loginSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors })

        const { email, password } = validation.data;

        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: t('user:userNotFound') });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: t('auth:invalidCredentials') });

        const permissions = await effectivePermissionsService(user);

        const token = generateToken({
            id: user.id,
            permissions: Array.from(permissions.keys()),
        },  
            CONFIG.JWT_SECRET,
            '30m'
        );

        const refreshToken = generateToken({
            id: user._id,
            type: 'refresh',
        },  
            CONFIG.JWT_REFRESH_SECRET,
            '7d'
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 30 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        await logger({
            user_id: user.id,
            action: 'login',
            module: 'auth',
            ip_address: req.ip,
        });

        return res.status(200).json({ message: t('auth:loginSuccessful') });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: t('auth:serverLoginError') });
    }
};

export const logout = async (req, res) => {
    try {
        const user = req.user;

        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        await updateUserById(user._id, { is2FAVerified: false });

        await logger({
            user_id: user.id,
            action: 'logout',
            module: 'auth',
            ip_address: req.ip,
        });

        return res.status(200).json({ message: t('auth:logoutSuccessful') });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: t('auth:serverLogoutError') });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const validated = await validateRequest(forgotPasswordSchema, req.body);
        const { email } = validated.data;

        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: t('auth:emailNotExist') });

        const { rawToken, tokenHash, expires } = await generateTempToken();

        await updateUserById(user._id, { tempToken: tokenHash, tempTokenExpires: expires });

        const resetURL = `${CONFIG.FRONTEND_URL}/password-reset?token=${rawToken}&email=${user.email}`;

        await sendEmail({
            to: user.email,
            subject: t('auth:resetPasswordEmailSent'), 
            template: 'forgot-password',
            context: {
                name: user.name,
                company: CONFIG.APP_NAME,
                resetURL
            }
        });

        return res.status(200).json({ message: t('auth:resetPasswordEmailSent') });

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: t('auth:serverForgotPasswordError') });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const validated = await validateRequest(resetPasswordSchema, { ...req.query, ...req.body });
        if(!validated.success) return res.status(400).json({ errors: validated.errors });

        const { email, token, password } = validated.data;

        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: t('auth:emailNotExist') });

        const validateToken = await validateTempToken(token, user.tempToken, user.tempTokenExpires);
        if (!validateToken.valid) return res.status(400).json({ message: validateToken.message });

        await updateUserById(user._id, {
            password: await bcrypt.hash(password, 10),
            tempToken: null,
            tempTokenExpires: null,
        });

        return res.status(200).json({ message: t('auth:resetPasswordSuccess') });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: t('auth:serverResetPasswordError') });
    }
}

export const authStatus = async (req, res) => {
    try {
        if(req.cookies.token){
            const decoded = jwt.verify(req.cookies.token, CONFIG.JWT_SECRET); 

            if(decoded) return res.status(200).json({ authenticated: true });         
        }
        
        return res.status(200).json({ authenticated: false });
    } catch (error) {
        console.log("Error", error);
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: t('auth:unauthenticatedNoRefreshToken') });

        const decoded = jwt.verify(refreshToken, CONFIG.JWT_REFRESH_SECRET);
        
        if(decoded && decoded?.type === 'refresh'){

            const user = await findUserById(decoded?.id);
            if (!user) return res.status(404).json({ message: t('user:userNotFound') });

            const permissions = await effectivePermissionsService(user);

            const token = generateToken({
                id: user._id,
                permissions: Array.from(permissions.keys()),
            },  
                CONFIG.JWT_SECRET,
                '30m'
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 30 * 60 * 1000,
            });
            
            return res.status(200).json({ message: t('auth:tokenRefreshed') });
        }

        return res.status(401).json({ message: t('auth:invalidOrExpiredRefreshToken') });
    } catch (error) {
        console.log("Error", error);
    }
}