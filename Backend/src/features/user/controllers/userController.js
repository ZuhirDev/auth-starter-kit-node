import { validateRequest } from '#utils/validation.js';
import { updatePasswordSchema, updateUserSchema, verifyEmailSchema } from '#user/validations/userValidation.js';
import { sendEmail } from '#config/mailer.js';
import CONFIG from '#config/config.js';
import { generateTempToken, validateTempToken } from '#utils/crypto/jwt.js';
import { t } from "#utils/i18n/index.js";
import { comparePassword } from '#utils/crypto/password.js';
import { formatUser } from '#helpers/userFormatter.js';

export class UserController {

    constructor({ userService }){
        this.userService = userService;
    }

    update = async (req, res) => {
        try {
            const validation = await validateRequest(updateUserSchema, req.body);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
    
            const { name } = validation.data;
    
            const user = await this.userService.findById(req.user.id);
            if(!user) return res.status(400).json({ message: t('user:userNotFound') });
    
            await this.userService.updateById(user.id, {
                name,
            });
    
            return res.status(200).json({ message: t('user:userUpdated') });
        } catch (error) {
            console.log("Error", error);    
            return res.status(500).json({ error: t('user:updateError') });
        }
    }
    
    updatePassword = async (req, res) => {
        try {
            const validation = await validateRequest(updatePasswordSchema, req.body);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
    
            const { current_password, password } = validation.data;
    
            const user = await this.userService.findById(req.user.id);
            if(!user) return res.status(400).json({ message: t('user:userNotFound') });
    
            const isMatch = await comparePassword(current_password, user.password);
            if (!isMatch) return res.status(401).json({ message: t('user:currentPasswordIncorrect') });
    
            await this.userService.updatePassword(user.id, password);
    
            return res.status(200).json({ message: t('user:passwordUpdated') });
        } catch (error) {
            console.log("Error", error);    
            return res.status(500).json({ error: t('user:passwordUpdateError') });
        }
    }
    
    me = async (req, res) => {
        try {
            const user = await this.userService.me(req.user);
            if(!user) return res.status(404).json({ message: t('user:userNotFound') });
    
            return res.status(200).json({ message: t('user:userProfileRetrieved'), data: formatUser(user, req.user.effectivePermissions), need_verify_2fa: user.twoFASecret && !user.is2FAVerified });
        } catch (error) {
            return res.status(500).json({ error: t('user:retrievingUserError') });
        }
    }
    
    sendVerificationEmail = async (req, res) => {
        try {
            const user = req.user;
            if(user && user?.email_verified_at) return res.status(400).json({ message: t('user:alreadyVerified') });
    
            const { rawToken, tokenHash, expires } = await generateTempToken();
    
            await this.userService.updateById(user.id, { tempToken: tokenHash, tempTokenExpires: expires });
    
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
            return res.status(500).json({ error: t('user:emailSendError') });
        }
    }
    
    verifyEmail = async (req, res) => {
        try {
            const validated = await validateRequest(verifyEmailSchema, { ...req.query, ...req.body });
            if(!validated.success) return res.status(400).json({ errors: validated.errors });
    
            const { id, token } = validated.data;
    
            const user = await this.userService.findById(id);
            if (!user) return res.status(404).json({ message: t('user:emailNotExist') });
    
            const validateToken = await validateTempToken(token, user.tempToken, user.tempTokenExpires);
            if (!validateToken.valid) return res.status(400).json({ message: validateToken.message });
    
            await this.userService.updateById(user.id, {
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
}
