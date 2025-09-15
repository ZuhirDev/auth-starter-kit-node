import { createUserService, findUserByEmail, formatUser, updateUserById } from "#user/services/userService.js";
import { generateTempToken, generateToken, validateTempToken } from "#utils/jwt.js";
import bcrypt from 'bcryptjs';
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "#auth/validations/authValidation.js";
import { validateRequest } from "#utils/validation.js";
import { sendEmail } from "#config/mailer.js";
import CONFIG from "#config/config.js";

export const register = async (req, res) => {
    try {
        const validation = await validateRequest(registerSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors })

        const { name, email, password } = validation.data;

        const existingUser = await findUserByEmail(email);
        if(existingUser) return res.status(409).json({ message: 'User already exists'});

        const user = await createUserService({ name, email, password });
            
        await sendEmail({ 
            to: user.email, 
            subject: `Welcome to ${CONFIG.APP_NAME}`, 
            feature:'auth', 
            template: 'welcome', 
            context: {
                name: user.name,
                company: CONFIG.APP_NAME,
            } 
        });

        return res.status(201).json({ message: 'User created successfully', data: formatUser(user) });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ error: 'Server error during creating user' });
    }
}

export const login = async (req, res) => {
    try {
        const validation = await validateRequest(loginSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors })

        const { email, password } = validation.data;

        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = generateToken({id: user._id});

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 30 * 60 * 1000,
        });

        return res.status(200).json({ message: 'Login successful', data: formatUser(user) });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Server error during login' });
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

        await updateUserById(user._id, { is2FAVerified: false });

        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Server error during logout' });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const validated = await validateRequest(forgotPasswordSchema, req.body);
        const { email } = validated.data;

        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: 'Email not exist' });

        const { rawToken, tokenHash, expires } = await generateTempToken();

        await updateUserById(user._id, { tempToken: tokenHash, tempTokenExpires: expires });

        const resetURL = `${CONFIG.FRONTEND_URL}/password-reset?token=${rawToken}&email=${user.email}`;

        await sendEmail({
            to: user.email,
            subject: 'Reset your password',
            feature: 'auth',
            template: 'forgot-password',
            context: {
                name: user.name,
                company: CONFIG.APP_NAME,
                resetURL
            }
        });

        return res.status(200).json({ message: 'Email sent for recovery password' });

    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: 'Server error during forgot password' });
    }
}


export const resetPassword = async (req, res) => {
    try {
        const validated = await validateRequest(resetPasswordSchema, { ...req.query, ...req.body });
        if(!validated.success) return res.status(400).json({ errors: validated.errors });

        const { email, token, password } = validated.data;

        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ message: 'Email not exist' });

        const validateToken = await validateTempToken(token, user.tempToken, user.tempTokenExpires);
        if (!validateToken.valid) return res.status(400).json({ message: validateToken.message });

        await updateUserById(user._id, {
            password: await bcrypt.hash(password, 10),
            tempToken: null,
            tempTokenExpires: null,
        });

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: 'Server error during reset password' });
    }
}