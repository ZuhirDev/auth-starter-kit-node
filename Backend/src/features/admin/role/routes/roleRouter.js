import express from 'express';
import { addPermissionToRole, allRolesDatatable, createRole, deleteRole, getAllRoles, getRoleById, removePermissionFromRole, updateRole } from '#admin/role/controllers/roleController.js';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';

const roleRouter = express.Router();

roleRouter.post('/', hasPermission('create', 'manage_roles'), createRole);
roleRouter.patch('/', hasPermission('update', 'manage_roles'), updateRole);
roleRouter.get('/', hasPermission('read', 'manage_roles'), getAllRoles);
roleRouter.get('/datatable', hasPermission('read', 'manage_roles'), allRolesDatatable);
roleRouter.get('/:id', hasPermission('read', 'manage_roles'), getRoleById);
roleRouter.post('/add-permission', hasPermission('create', 'manage_roles'), addPermissionToRole);
roleRouter.post('/remove-permission', hasPermission('delete', 'manage_roles'), removePermissionFromRole);
roleRouter.delete('/:id', hasPermission('delete', 'manage_roles'), deleteRole);

export default  roleRouter;