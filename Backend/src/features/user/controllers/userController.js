import { findUserById, formatUser, meService, updatePasswordService, updateUserById } from '#user/services/userService.js';
import { VerifyPasswordService } from '#auth/services/authService.js';
import { validateRequest } from '#utils/validation.js';
import { updatePasswordSchema, updateUserSchema, verifyEmailSchema } from '#user/validations/userValidation.js';
import { sendEmail } from '#config/mailer.js';
import CONFIG from '#config/config.js';
import { generateTempToken, validateTempToken } from '#utils/jwt.js';

export const updateUser = async (req, res) => {
    try {
        const validation = await validateRequest(updateUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { name} = validation.data;

        const user = await findUserById(req.user.id);
        if(!user) return res.status(400).json({ message: 'User not found' });

        await updateUserById(user.id, {
            name
        });

        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log("Error", error);    
        return res.status(500).json({ error: 'Error updating user' });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const validation = await validateRequest(updatePasswordSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { current_password, password } = validation.data;

        const user = await findUserById(req.user.id);
        if(!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await VerifyPasswordService(current_password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });

        const updatedPassword = await updatePasswordService(user.id, password);

        return res.status(200).json({ message: 'Password updated successfully', data: formatUser(updatedPassword) });
    } catch (error) {
        console.log("Error", error);    
        return res.status(500).json({ error: 'Error updating password' });
    }
}

export const me = async (req, res) => {
    try {
        const user = await meService(req);
        if(!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({ message: 'User profile retrieved', data: formatUser(user) });
    } catch (error) {
        return res.status(500).json({ error: 'Error updating password' });
    }
}

export const sendVerificationEmail = async (req, res) => {
    try {
        const user = req.user;
        if(user && user?.email_verified_at) return res.status(400).json({ message: 'User already verified' });

        const { rawToken, tokenHash, expires } = await generateTempToken();

        await updateUserById(user._id, { tempToken: tokenHash, tempTokenExpires: expires });

        const url = `${CONFIG.FRONTEND_URL}/verify-email?expires=${expires}&token=${rawToken}&id=${user._id}`;

        await sendEmail({ 
            to: user.email, 
            subject: `Reset your ${CONFIG.APP_NAME} password`, 
            feature:'user',
            template: 'verify_email',
            context: {
                name: user.name,
                company: CONFIG.APP_NAME,
                url,
            } 
        });

        return res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {        
        return res.status(500).json({ error: 'Error sending email verification', details: error });
    }
}


export const verifyEmail = async (req, res) => {
    try {
        const validated = await validateRequest(verifyEmailSchema, { ...req.query, ...req.body });
        if(!validated.success) return res.status(400).json({ errors: validated.errors });

        const { id, token } = validated.data;

        const user = await findUserById(id);
        if (!user) return res.status(404).json({ message: 'Email not exist' });

        const validateToken = await validateTempToken(token, user.tempToken, user.tempTokenExpires);
        if (!validateToken.valid) return res.status(400).json({ message: validateToken.message });

        await updateUserById(user._id, {
            email_verified_at: new Date(),
            tempToken: null,
            tempTokenExpires: null,
        });

        return res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: 'Server error during reset password' });
    }
}
