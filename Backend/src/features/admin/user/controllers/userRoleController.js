import { validateRequest } from "#utils/validation.js";
import { assignRoleToUserSchema, getUserRolesSchema, removeRoleFromUserSchema } from "#admin/user/validations/userRoleValidation.js";
import { assignRolesToUserService, removeRolesFromUserService } from "#admin/user/services/userRoleService.js";
import { findUserById } from "#user/services/userService.js";
import { logger } from "#admin/log/controllers/logController.js";
import { t } from "#utils/i18n/index.js";

export const assignRolesToUser = async (req, res) => {
    try {
        const validation = await validateRequest(assignRoleToUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, roleIds } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: t('user:userNotFound') });

        await user.populate('roles');

        const userRole = await assignRolesToUserService(user, roleIds);
        if(!userRole) return res.status(400).json({ message: t('user:roleAlreadyAssigned') });

        await logger({
            user_id: req.user.id,
            action: 'assignRolesToUser',
            module: 'role',
            target_id: user.id,
            ip_address: req.ip,
        });

        return res.status(200).json({ message: t('user:roleAssignedSuccessfully') });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: t('user:errorAssigningRole') });
    }
}

export const removeRolesFromUser = async (req, res) => {
    try {
        const validation = await validateRequest(removeRoleFromUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, roleIds } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: t('user:userNotFound') });

        await user.populate('roles');

        const userRole = await removeRolesFromUserService(user, roleIds);
        if(!userRole) return res.status(400).json({ message: t('user:roleNotAssigned') });

        await logger({
            user_id: req.user.id,
            action: 'removeRolesFromUser',
            module: 'role',
            target_id: user.id,
            ip_address: req.ip,
        });

        return res.status(200).json({ message: t('user:roleRemovedSuccessfully') });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: t('user:errorRemovingRole') });
    }
}

export const getUserRoles = async (req, res) => {
    try {
        const validation = await validateRequest(getUserRolesSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id } = validation.data;

        const user = await findUserById(id);
        if(!user) return res.status(404).json({ message: t('user:userNotFound') });

        await user.populate('roles');

        return res.status(200).json({ message: t('user:userRolesRetrieved'), data: user.roles });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: t('user:errorGettingUserRoles') });
    }
}