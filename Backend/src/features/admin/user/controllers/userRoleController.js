import { validateRequest } from "#utils/validation.js";
import { assignRoleToUserSchema, getUserRolesSchema, removeRoleFromUserSchema } from "#admin/user/validations/userRoleValidation.js";
import { t } from "#utils/i18n/index.js";

export class UserRoleController {

    constructor({ userService, userRoleService, logService }){
        this.userService = userService;
        this.userRoleService = userRoleService;
        this.logService = logService;
    }
    
    assignRolesToUser = async (req, res) => {
        try {
            const validation = await validateRequest(assignRoleToUserSchema, req.body);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
    
            const { userId, roleIds } = validation.data;
    
            const user = await this.userService.findById(userId);
            if(!user) return res.status(404).json({ message: t('user:userNotFound') });
        
            const userRole = await this.userRoleService.assignRolesToUser(user.id, roleIds);
            if(!userRole) return res.status(400).json({ message: t('user:roleAlreadyAssigned') });
    
            await this.logService.logger({
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
    
    removeRolesFromUser = async (req, res) => {
        try {
            const validation = await validateRequest(removeRoleFromUserSchema, req.body);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
    
            const { userId, roleIds } = validation.data;
    
            const user = await this.userService.findById(userId);
            if(!user) return res.status(404).json({ message: t('user:userNotFound') });
    
            const userRole = await this.userRoleService.removeRolesFromUser(user.id, roleIds);
            if(!userRole) return res.status(400).json({ message: t('user:roleNotAssigned') });
    
            await this.logService.logger({
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
    
    getUserRoles = async (req, res) => {
        try {
            const validation = await validateRequest(getUserRolesSchema, req.params);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
    
            const { id } = validation.data;
    
            const roles = await this.userRoleService.getUserRoles(id);
            if(!roles) return res.status(404).json({ message: t('user:userNotFound') });
    
            return res.status(200).json({ message: t('user:userRolesRetrieved'), data: roles });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ message: t('user:errorGettingUserRoles') });
        }
    }
}


