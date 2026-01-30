import { findUserById, formatUser, formatUsers, getAllUsersService, meService, updatePasswordService, updateUserById } from '#user/services/userService.js';
import { VerifyPasswordService } from '#auth/services/authService.js';
import { validateRequest } from '#utils/validation.js';
import { updatePasswordSchema, updateUserSchema, verifyEmailSchema } from '#user/validations/userValidation.js';
import { sendEmail } from '#config/mailer.js';
import CONFIG from '#config/config.js';
import { generateTempToken, validateTempToken } from '#utils/jwt.js';
import { Datatable } from '#helpers/datatable.js';
import { t } from "#utils/i18n/index.js"

export const updateUser = async (req, res) => {
    try {
        const validation = await validateRequest(updateUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { name } = validation.data;

        const user = await findUserById(req.user.id);
        if(!user) return res.status(400).json({ message: t('user:userNotFound') });

        await updateUserById(user.id, {
            name
        });

        return res.status(200).json({ message: t('user:userUpdated') });
    } catch (error) {
        console.log("Error", error);    
        return res.status(500).json({ error: t('user:updateError') });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const validation = await validateRequest(updatePasswordSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { current_password, password } = validation.data;

        const user = await findUserById(req.user.id);
        if(!user) return res.status(400).json({ message: t('user:userNotFound') });

        const isMatch = await VerifyPasswordService(current_password, user.password);
        if (!isMatch) return res.status(401).json({ message: t('user:currentPasswordIncorrect') });

        await updatePasswordService(user.id, password);

        return res.status(200).json({ message: t('user:passwordUpdated') });
    } catch (error) {
        console.log("Error", error);    
        return res.status(500).json({ error: t('user:passwordUpdateError') });
    }
}

export const me = async (req, res) => {
    try {
        const user = await meService(req.user);
        if(!user) return res.status(404).json({ message: t('user:userNotFound') });

        return res.status(200).json({ message: t('user:userProfileRetrieved'), data: formatUser(user, req.user.effectivePermissions), need_verify_2fa: user.twoFASecret && !user.is2FAVerified });
    } catch (error) {
        return res.status(500).json({ error: t('user:retrievingUserError') });
    }
}

export const sendVerificationEmail = async (req, res) => {
    try {
        const user = req.user;
        if(user && user?.email_verified_at) return res.status(400).json({ message: t('user:alreadyVerified') });

        const { rawToken, tokenHash, expires } = await generateTempToken();

        await updateUserById(user.id, { tempToken: tokenHash, tempTokenExpires: expires });

        const url = `${CONFIG.FRONTEND_URL}/verify-email?expires=${expires}&token=${rawToken}&id=${user.id}`;

        await sendEmail({ 
            to: user.email, 
            subject: `Verify your ${CONFIG.APP_NAME} account`, 
            template: 'verify_email',
            context: {
                name: user.name,
                company: CONFIG.APP_NAME,
                url,
            } 
        });

        return res.status(200).json({ message: t('user:verificationEmailSent') });
    } catch (error) {        
        return res.status(500).json({ error: t('user:emailSendError'), details: error });
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const validated = await validateRequest(verifyEmailSchema, { ...req.query, ...req.body });
        if(!validated.success) return res.status(400).json({ errors: validated.errors });

        const { id, token } = validated.data;

        const user = await findUserById(id);
        if (!user) return res.status(404).json({ message: t('user:emailNotExist') });

        const validateToken = await validateTempToken(token, user.tempToken, user.tempTokenExpires);
        if (!validateToken.valid) return res.status(400).json({ message: validateToken.message });

        await updateUserById(user._id, {
            email_verified_at: new Date(),
            tempToken: null,
            tempTokenExpires: null,
        });

        return res.status(200).json({ message: t('user:emailVerified') });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: t('user:errorResetPassword') });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();

        return res.status(200).json({ 
            message: t('user:usersRetrieved'), 
            data: users,
        });
    } catch (error) {
        return res.status(500).json({ error: t('user:errorRetrievingUsers') });
    }
}

export const allUsersDatatable = async (req, res) => {
    try {
        const users = await getAllUsersService();
        const usersFormatted = formatUsers(users);

        const datatable = new Datatable(usersFormatted, req.query)
        const response = await datatable.toJson();

        return res.status(200).json({ 
            message: t('user:usersRetrieved'), 
            data: response.data,
            totalCount: response.totalCount,
        });
    } catch (error) {
        return res.status(500).json({ error: t('user:errorRetrievingUsers') });
    }
}
