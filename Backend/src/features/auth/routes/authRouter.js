import express from 'express';
import { auth } from '#auth/middleware/authMiddleware.js';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';
import { verifyPassword } from '#auth/middleware/verifyPasswordMiddleware.js';

const authRouter = ({ userService, authController, twoFAController }) => {
    const router = express.Router();
    
    router.get('/refresh-token', authController.refreshToken);
    router.get('/auth/status', authController.authStatus);
    
    router.post('/login', authController.login);
    router.post('/register', authController.register);
    router.post('/logout', auth, authController.logout);
    
    router.post('/2fa/enable', auth, verifyPassword(userService), TwoFA, twoFAController.enable2FA);
    router.post('/2fa/verify', auth, twoFAController.verify2FA);
    router.post('/2fa/disable', auth, verifyPassword(userService), TwoFA, twoFAController.disable2FA);
    
    router.post('/forgot-password', authController.forgotPassword);
    router.post('/password-reset', authController.resetPassword);
    
    router.post('/oauth', authController.oAuth);

    return router;
} 

export default authRouter;