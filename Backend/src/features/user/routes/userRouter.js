import { me, sendVerificationEmail, updatePassword, updateUser, verifyEmail } from '#user/controllers/userController.js';
import { auth } from '#auth/middleware/authMiddleware.js';
import express from 'express';

const userRouter = express.Router();

userRouter.post('/update-password', updatePassword);
userRouter.post('/update', updateUser);
userRouter.get('/me', me);

userRouter.post('/send-verify-email', sendVerificationEmail);
userRouter.get('/verify-email', auth, verifyEmail);


export default userRouter;