import express from 'express';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';
import { auth } from '#auth/middleware/authMiddleware.js';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';

const configRouter = ({ configController }) => {
    const router = express.Router();

    router.get('/public', configController.getAllPublic);
    router.get('/', auth, TwoFA, hasPermission('read', 'manage_config'), configController.getAll);
    router.get('/datatable', auth, TwoFA, hasPermission('read', 'manage_config'), configController.datatable);
    router.patch('/', auth, TwoFA, hasPermission('update', 'manage_config'), configController.update);

    return router;
}

export default configRouter;