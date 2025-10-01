import { getAllUsers, me, sendVerificationEmail, updatePassword, updateUser, verifyEmail } from '#user/controllers/userController.js';
import express from 'express';
import { assignPermissionToUser, getUserPermission, removePermissionFromUser } from '#user/controllers/userPermissionController.js';
import { assignRoleToUser, getUserRoles, removeRoleFromUser } from '#user/controllers/userRoleController.js';
import { hasPermission } from '#admin/permission/middleware/hasPermissionMiddleware.js';

const userRouter = express.Router();

userRouter.post('/update-password', updatePassword);
userRouter.post('/update', updateUser);
userRouter.get('/me', me);

userRouter.post('/send-verify-email', sendVerificationEmail);
userRouter.get('/verify-email', verifyEmail);

userRouter.post('/user/assign-permission', hasPermission('create', 'manage_permissions'), assignPermissionToUser);
userRouter.post('/user/remove-permission', hasPermission('delete', 'manage_permissions'), removePermissionFromUser);
userRouter.get('/user/permission/:id', hasPermission('read', 'manage_permissions'), getUserPermission);

userRouter.post('/user/assign-role', hasPermission('create', 'manage_roles'), assignRoleToUser);
userRouter.post('/user/remove-role', hasPermission('delete', 'manage_roles'), removeRoleFromUser);
userRouter.get('/user/roles/:id', hasPermission('read', 'manage_roles'), getUserRoles);

userRouter.get('/users', getAllUsers);


export default userRouter;