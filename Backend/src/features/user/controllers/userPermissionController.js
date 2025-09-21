import { validateRequest } from "#utils/validation.js";
import { assignPermissionToUserSchema, getUserPermissionSchema, removePermissionFromUserSchema } from "#user/validations/userPermissionValidation.js";
import { assignPermissionToUserService, removePermissionFromUserService } from "#user/services/userPermissionService.js";
import { findUserById, formatUser } from "#user/services/userService.js";

export const assignPermissionToUser = async (req, res) => {
    try {
        const validation = await validateRequest(assignPermissionToUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, permissionId } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('permissions');

        const userPermission = await assignPermissionToUserService(user, permissionId);
        if (!userPermission) return res.status(400).json({ message: "Permission  already assigned to user" });

        return res.status(200).json({ message: "Permission assigned to user successfully", data: formatUser(userPermission) });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: "Error assigning permission to user" });
    }
}

export const removePermissionFromUser = async (req, res) => {
    try {
        const validation = await validateRequest(removePermissionFromUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, permissionId } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('permissions');

        const userPermission = await removePermissionFromUserService(user, permissionId);
        if (!userPermission) return res.status(400).json({ message: "Permission  not assigned to user" });

        return res.status(200).json({ message: "Permission removed from user successfully", data: userPermission });
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