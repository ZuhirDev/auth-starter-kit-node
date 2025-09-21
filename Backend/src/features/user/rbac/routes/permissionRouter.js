import express from 'express';
import { createPermission, deletePermission, getAllPermissions, getPermissionById, updatePermission } from '#rbac/controllers/permissionController.js';
import { hasPermission } from '#rbac/middleware/hasPermissionMiddleware.js';

const permissionRouter = express.Router();

permissionRouter.post('/', hasPermission('create', 'manage_permissions'), createPermission);
permissionRouter.get('/', hasPermission('read', 'manage_permissions'), getAllPermissions);
permissionRouter.get('/:id', hasPermission('read', 'manage_permissions'), getPermissionById);
permissionRouter.patch('/', hasPermission('update', 'manage_permissions'), updatePermission);
permissionRouter.delete('/:id', hasPermission('delete', 'manage_permissions'), deletePermission);

export default permissionRouter;