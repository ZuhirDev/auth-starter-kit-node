import express from 'express';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';
import { auth } from '#auth/middleware/authMiddleware.js';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';

const adminUserRouter = ({ userPermissionController, userRoleController, userAdminController  }) => {
    const router = express.Router();
    
    router.post('/user/assign-permissions', auth, TwoFA, hasPermission('create', 'manage_users'), userPermissionController.assignPermissionsToUser);
    router.post('/user/remove-permissions', auth, TwoFA, hasPermission('delete', 'manage_users'), userPermissionController.removePermissionsFromUser);
    router.get('/user/permission/:id', auth, TwoFA, hasPermission('read', 'manage_users'), userPermissionController.getUserPermissions);
    
    router.post('/user/assign-roles', auth, TwoFA, hasPermission('create', 'manage_users'), userRoleController.assignRolesToUser);
    router.post('/user/remove-roles', auth, TwoFA, hasPermission('delete', 'manage_users'), userRoleController.removeRolesFromUser);
    router.get('/user/roles/:id', auth, TwoFA, hasPermission('read', 'manage_users'), userRoleController.getUserRoles);
    
    router.get('/users', auth, TwoFA, hasPermission('read', 'manage_users'), userAdminController.getAll);
    router.get('/users/datatable', auth, TwoFA, hasPermission('read', 'manage_users'), userAdminController.datatable);
    router.delete('/user/:id', auth, TwoFA, hasPermission('delete', 'manage_users'), userAdminController.deleteById);

    return router;
}

export default adminUserRouter;