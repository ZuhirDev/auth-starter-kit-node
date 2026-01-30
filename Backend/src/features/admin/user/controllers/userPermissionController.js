import { validateRequest } from "#utils/validation.js";
import { assignPermissionToUserSchema, getUserPermissionSchema, removePermissionFromUserSchema } from "#admin/user/validations/userPermissionValidation.js";
import { t } from "#utils/i18n/index.js";

export class UserPermissionController {

    constructor({ userService, userPermissionService, logService }){
        this.userService = userService;
        this.userPermissionService = userPermissionService;
        this.logService = logService;
    }

    assignPermissionsToUser = async (req, res) => {
        try {
            const validation = await validateRequest(assignPermissionToUserSchema, req.body);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
    
            const { userId, permissionIds } = validation.data;
    
            const user = await this.userService.findById(userId);
            if(!user) return res.status(404).json({ message: t('user:userNotFound') });
      
            const result = await this.userPermissionService.assignPermissionsToUser(userId, permissionIds);
            if(!result) return res.status(400).json({ message: t('user:permissionAlreadyAssigned') });
    
            await this.logService.logger({
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
    
    removePermissionsFromUser = async (req, res) => {
        try {
            const validation = await validateRequest(removePermissionFromUserSchema, req.body);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
    
            const { userId, permissionIds } = validation.data;
    
            const user = await this.userService.findById(userId);
            if(!user) return res.status(404).json({ message: t('user:userNotFound') });
    
            const result = await this.userPermissionService.removePermissionsFromUser(userId, permissionIds);
            if(!result) return res.status(400).json({ message: t('user:permissionAlreadyAssigned') });
    
            await this.logService.logger({
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

    getUserPermissions = async (req, res) => {
        try {
            const validation = await validateRequest(getUserPermissionSchema, req.params);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
    
            const { id } = validation.data;
    
            const permissions = await this.userPermissionService.getUserPermissions(id);
            return res.status(200).json({ message: t('user:userPermissionsRetrieved'), data: permissions });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ message: t('user:errorGettingUserPermissions') });
        }
    }
}



