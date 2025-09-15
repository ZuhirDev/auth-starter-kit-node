import express from 'express';
import userRouter from '#user/routes/userRouter.js';
import authRouter from '#auth/routes/authRouter.js';
import { auth } from '#auth/middleware/authMiddleware.js';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';

const router = express.Router();

router.use('/languages', (req, res) => {
    res.json({ languages: ['en', 'es', 'de'] });
});
router.use('/', authRouter);
router.use('/', auth, TwoFA, userRouter);
router.use('/', (req, res) => {
    res.json({ message: 'Hellow from Backend' });
});

export default router;