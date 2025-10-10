import { validateRequest } from "#utils/validation.js";
import { assignPermissionToUserSchema, getUserPermissionSchema, removePermissionFromUserSchema } from "#admin/user/validations/userPermissionValidation.js";
import {  assignPermissionsToUserService, removePermissionsFromUserService } from "#admin/user/services/userPermissionService.js";
import { findUserById, formatUser } from "#user/services/userService.js";
import { logger } from "#admin/log/controllers/logController.js";

export const assignPermissionsToUser = async (req, res) => {
    try {
        const validation = await validateRequest(assignPermissionToUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, permissionIds } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('permissions');

        const userPermission = await assignPermissionsToUserService(user, permissionIds);
        if (!userPermission) return res.status(400).json({ message: "Permission  already assigned to user" });

        await logger({
            user_id: req.user.id,
            action: 'assignPermissionsToUser',
            module: 'permission',
            target_id: user.id,
            ip_address: req.ip,
        });

        return res.status(200).json({ message: "Permission assigned to user successfully", data: formatUser(userPermission) });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: "Error assigning permission to user" });
    }
}

export const removePermissionsFromUser = async (req, res) => {
    try {
        const validation = await validateRequest(removePermissionFromUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, permissionIds } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('permissions');

        const userPermission = await removePermissionsFromUserService(user, permissionIds);
        if (!userPermission) return res.status(400).json({ message: "Permission  not assigned to user" });

        await logger({
            user_id: req.user.id,
            action: 'removePermissionsFromUser',
            module: 'permission',
            target_id: user.id,
            ip_address: req.ip,
        });
        
        return res.status(200).json({ message: "Permission removed from user successfully", data: formatUser(userPermission) });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: "Error removing permission from user" });
    }
}

export const getUserPermission = async (req, res) => {
    try {
        const validation = await validateRequest(getUserPermissionSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id } = validation.data;

        const user = await findUserById(id);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('permissions');

        return res.status(200).json({ message: "User permissions retrieved successfully", data: user.permissions });
    } catch (error) {
        return res.status(500).json({ error: "Error getting user permissions" });
    }
}