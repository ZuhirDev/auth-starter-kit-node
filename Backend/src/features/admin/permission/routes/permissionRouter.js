import express from 'express';
import { allPermissionsDatatable, createPermission, deletePermission, getAllPermissions, getPermissionById, updatePermission } from '#admin/permission/controllers/permissionController.js';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';

const permissionRouter = express.Router();

permissionRouter.post('/', hasPermission('create', 'manage_permissions'), createPermission);
permissionRouter.get('/', hasPermission('read', 'manage_permissions'), getAllPermissions);
permissionRouter.get('/datatable', hasPermission('read', 'manage_permissions'), allPermissionsDatatable);
permissionRouter.get('/:id', hasPermission('read', 'manage_permissions'), getPermissionById);
permissionRouter.patch('/', hasPermission('update', 'manage_permissions'), updatePermission);
permissionRouter.delete('/:id', hasPermission('delete', 'manage_permissions'), deletePermission);

export default permissionRouter;