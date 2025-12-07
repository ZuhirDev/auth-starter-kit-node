import express from 'express';
import { sendVerificationEmail, updatePassword, updateUser, verifyEmail } from '#user/controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/update-password', updatePassword);
userRouter.post('/update', updateUser);

userRouter.post('/send-verify-email', sendVerificationEmail);
userRouter.get('/verify-email', verifyEmail);

export default userRouter;