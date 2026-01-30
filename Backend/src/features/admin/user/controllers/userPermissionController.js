import { validateRequest } from "#utils/validation.js";
import { assignPermissionToUserSchema, getUserPermissionSchema, removePermissionFromUserSchema } from "#admin/user/validations/userPermissionValidation.js";
import { assignPermissionsToUserService, removePermissionsFromUserService } from "#admin/user/services/userPermissionService.js";
import { findUserById } from "#user/services/userService.js";
import { logger } from "#admin/log/controllers/logController.js";
import { t } from "#utils/i18n/index.js";

export const assignPermissionsToUser = async (req, res) => {
    try {
        const validation = await validateRequest(assignPermissionToUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, permissionIds } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: t('user:userNotFound') });

        await user.populate('permissions');

        const userPermission = await assignPermissionsToUserService(user, permissionIds);
        if(!userPermission) return res.status(400).json({ message: t('user:permissionAlreadyAssigned') });

        await logger({
            user_id: req.user.id,
            action: 'assignPermissionsToUser',
            module: 'permission',
            target_id: user.id,
            ip_address: req.ip,
        });

        return res.status(200).json({ message: t('user:permissionAssignedSuccessfully') });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: t('user:errorAssigningPermission') });
    }
}

export const removePermissionsFromUser = async (req, res) => {
    try {
        const validation = await validateRequest(removePermissionFromUserSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { userId, permissionIds } = validation.data;

        const user = await findUserById(userId);
        if(!user) return res.status(404).json({ message: t('user:userNotFound') });

        await user.populate('permissions');

        const userPermission = await removePermissionsFromUserService(user, permissionIds);
        if(!userPermission) return res.status(400).json({ message: t('user:permissionNotAssigned') });

        await logger({
            user_id: req.user.id,
            action: 'removePermissionsFromUser',
            module: 'permission',
            target_id: user.id,
            ip_address: req.ip,
        });

        return res.status(200).json({ message: t('user:permissionRemovedSuccessfully') });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: t('user:errorRemovingPermission') });
    }
}

export const getUserPermission = async (req, res) => {
    try {
        const validation = await validateRequest(getUserPermissionSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id } = validation.data;

        const user = await findUserById(id);
        if(!user) return res.status(404).json({ message: t('user:userNotFound') });

        await user.populate('permissions');

        return res.status(200).json({ message: t('user:userPermissionsRetrieved'), data: user.permissions });
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: t('user:errorGettingUserPermissions') });
    }
}