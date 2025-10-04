import express from 'express';
import { allUsersDatatable, getAllUsers } from '#user/controllers/userController.js';
import { assignPermissionsToUser, getUserPermission, removePermissionsFromUser } from '#admin/user/controllers/userPermissionController.js';
import { assignRolesToUser, getUserRoles, removeRolesFromUser } from '#admin/user/controllers/userRoleController.js';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';

const adminUserRouter = express.Router();

adminUserRouter.post('/user/assign-permissions', hasPermission('create', 'manage_users'), assignPermissionsToUser);
adminUserRouter.post('/user/remove-permissions', hasPermission('delete', 'manage_users'), removePermissionsFromUser);
adminUserRouter.get('/user/permission/:id', hasPermission('read', 'manage_users'), getUserPermission);

adminUserRouter.post('/user/assign-roles', hasPermission('create', 'manage_users'), assignRolesToUser);
adminUserRouter.post('/user/remove-roles', hasPermission('delete', 'manage_users'), removeRolesFromUser);
adminUserRouter.get('/user/roles/:id', hasPermission('read', 'manage_users'), getUserRoles);

adminUserRouter.get('/users', hasPermission('read', 'manage_users'), getAllUsers);
adminUserRouter.get('/users/datatable', hasPermission('read', 'manage_users'), allUsersDatatable);

export default adminUserRouter;