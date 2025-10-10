import express from 'express';
import userRouter from '#user/routes/userRouter.js';
import authRouter from '#auth/routes/authRouter.js';
import { auth } from '#auth/middleware/authMiddleware.js';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';
import roleRouter from '#admin/role/routes/roleRouter.js';
import permissionRouter from '#admin/permission/routes/permissionRouter.js';
import adminUserRouter from '#admin/user/routes/adminUserRouter.js';

const router = express.Router();

router.use('/languages', (req, res) => {
    res.json({ languages: ['en', 'es', 'de'] });
});

router.use('/', authRouter);
router.use('/', auth, TwoFA, userRouter);
router.use('/', auth, TwoFA, adminUserRouter);
router.use('/roles', auth, TwoFA, roleRouter);
router.use('/permissions', auth, TwoFA, permissionRouter);

router.get('/', (req, res) => {
    res.json({ message: 'Hello from backend' });
});

router.use('/', (req, res) => {
    res.status(404).json({ message: 'Not found in Backend' });
});

export default router;