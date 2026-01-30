import { TwoFA } from '#auth/middleware/2faMiddleware.js';
import { auth } from '#auth/middleware/authMiddleware.js';
import express from 'express';

const userRouter = ({ userController }) => {
    const router = express.Router();

    router.get('/me', auth, userController. me);
    router.post('/update-password', auth, TwoFA, userController.updatePassword);
    router.post('/update', auth, TwoFA, userController.update);
    
    router.post('/send-verify-email', auth, TwoFA, userController.sendVerificationEmail);
    router.get('/verify-email',auth, TwoFA,  userController.verifyEmail);

    return router;
}

export default userRouter;