import express from 'express';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';
import { auth } from '#auth/middleware/authMiddleware.js';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';

const roleRouter = ({ roleController }) => {
    const router = express.Router();

    router.post('/', auth, TwoFA, hasPermission('create', 'manage_roles'), roleController.create);
    router.patch('/', auth, TwoFA, hasPermission('update', 'manage_roles'), roleController.update);
    router.get('/', auth, TwoFA, hasPermission('read', 'manage_roles'), roleController.getAll);
    router.get('/datatable', auth, TwoFA, hasPermission('read', 'manage_roles'), roleController.datatable);
    router.get('/:id', auth, TwoFA, hasPermission('read', 'manage_roles'), roleController.getById);
    router.post('/add-permission', auth, TwoFA, hasPermission('create', 'manage_roles'), roleController.addPermissions);
    router.post('/remove-permission', auth, TwoFA, hasPermission('delete', 'manage_roles'), roleController.removePermissions);
    router.delete('/:id', auth, TwoFA, hasPermission('delete', 'manage_roles'), roleController.delete);

    return router;
}

export default roleRouter;