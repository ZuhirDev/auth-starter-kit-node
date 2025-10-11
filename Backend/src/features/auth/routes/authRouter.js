import express from 'express';
import { auth } from '#auth/middleware/authMiddleware.js';
import { authStatus, forgotPassword, login, logout, oAuth, refreshToken, register, resetPassword } from '#auth/controllers/authController.js'
import { disable2FA, enable2FA, verify2FA } from '#auth/controllers/2faController.js';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';
import { verifyPassword } from '#auth/middleware/verifyPasswordMiddleware.js';

const authRouter = express.Router();

authRouter.get('/refresh-token', refreshToken);
authRouter.get('/auth/status', authStatus);

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', auth, TwoFA, logout);

authRouter.post('/2fa/enable', auth, verifyPassword, TwoFA, enable2FA);
authRouter.post('/2fa/verify', auth, verify2FA);
authRouter.post('/2fa/disable', auth, verifyPassword, TwoFA, disable2FA);

authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/password-reset', resetPassword);

authRouter.post('/oauth', oAuth);

export default authRouter;