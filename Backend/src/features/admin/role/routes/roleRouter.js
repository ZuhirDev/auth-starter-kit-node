import express from 'express';
import { addPermissionToRole, createRole, deleteRole, getAllRoles, getRoleById, removePermissionFromRole } from '#admin/role/controllers/roleController.js';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';

const roleRouter = express.Router();

roleRouter.post('/', hasPermission('create', 'manage_roles'), createRole);
roleRouter.get('/', hasPermission('read', 'manage_roles'), getAllRoles);
roleRouter.get('/:id', hasPermission('read', 'manage_roles'), getRoleById);
roleRouter.post('/add-permission', hasPermission('create', 'manage_roles'), addPermissionToRole);
roleRouter.post('/remove-permission', hasPermission('delete', 'manage_roles'), removePermissionFromRole);
roleRouter.delete('/:id', hasPermission('delete', 'manage_roles'), deleteRole);

export default  roleRouter;