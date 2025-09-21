import { validateRequest } from "#utils/validation.js";
import { assignRoleToUserSchema, getUserRolesSchema, removeRoleFromUserSchema } from "#user/validations/userRoleValidation.js";
import { assignRoleToUserService, removeRoleFromUserService } from "#user/services/userRoleService.js";
import { findUserById } from "#user/services/userService.js";

export const assignRoleToUser = async (req, res) => {
    try {
        console.log(req.body)
        const validation = await validateRequest(assignRoleToUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, roleId } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('roles');

        console.log("user", user)

        const userRole = await assignRoleToUserService(user, roleId);
        if (!userRole) return res.status(400).json({ message: "Role already assigned to user" });

        return res.status(200).json({ message: "Role assigned to user successfully", data: userRole });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ error: "Error assigning role to user" });
    }
}

export const removeRoleFromUser = async (req, res) => {
    try {
        const validation = await validateRequest(removeRoleFromUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, roleId } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });

        await user.populate('roles');

        const userRole = await removeRoleFromUserService(user, roleId);
        if (!userRole) return res.status(400).json({ message: "Role not assigned to user" });

        return res.status(200).json({ message: "Role removed to user successfully", data: userRole });
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