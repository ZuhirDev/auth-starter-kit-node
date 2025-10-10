import { validateRequest } from "#utils/validation.js";
import { assignRoleToUserSchema, getUserRolesSchema, removeRoleFromUserSchema } from "#admin/user/validations/userRoleValidation.js";
import { assignRolesToUserService, removeRolesFromUserService } from "#admin/user/services/userRoleService.js";
import { findUserById, formatUser } from "#user/services/userService.js";

export const assignRolesToUser = async (req, res) => {
    try {
        const validation = await validateRequest(assignRoleToUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, roleIds } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('roles');

        const userRole = await assignRolesToUserService(user, roleIds);
        if (!userRole) return res.status(400).json({ message: "Role already assigned to user" });

        return res.status(200).json({ message: "Role assigned to user successfully" });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: "Error assigning role to user" });
    }
}

export const removeRolesFromUser = async (req, res) => {
    try {
        const validation = await validateRequest(removeRoleFromUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, roleIds } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('roles');

        const userRole = await removeRolesFromUserService(user, roleIds);
        if (!userRole) return res.status(400).json({ message: "Role not assigned to user" });

        return res.status(200).json({ message: "Role removed to user successfully" });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: "Error removing role to user" });
    }
}

export const getUserRoles = async (req, res) => {
    try {
        const validation = await validateRequest(getUserRolesSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id } = validation.data;

        const user = await findUserById(id);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('roles');

        return res.status(200).json({ message: "User roles retrieved successfully", data: user.roles });
    } catch (error) {
        return res.status(500).json({ error: "Error getting user roles" });
    }
}