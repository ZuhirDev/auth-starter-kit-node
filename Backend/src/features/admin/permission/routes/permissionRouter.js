import express from 'express';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';
import { auth } from '#auth/middleware/authMiddleware.js';

const permissionRouter = ({ permissionController }) => {
    const router = express.Router();

    router.post('/', auth, TwoFA, hasPermission('create', 'manage_permissions'), permissionController.create);
    router.get('/', auth, TwoFA, hasPermission('read', 'manage_permissions'), permissionController.getAll);
    router.get('/datatable', auth, TwoFA, hasPermission('read', 'manage_permissions'), permissionController.datatable);
    router.get('/:id', auth, TwoFA, hasPermission('read', 'manage_permissions'), permissionController.findById);
    router.patch('/', auth, TwoFA, hasPermission('update', 'manage_permissions'), permissionController.update);
    router.delete('/:id', auth, TwoFA, hasPermission('delete', 'manage_permissions'), permissionController.delete);

    return router;
}

export default permissionRouter;