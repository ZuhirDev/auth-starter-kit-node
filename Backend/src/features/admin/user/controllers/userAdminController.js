import { validateRequest } from '#utils/validation.js';
import { deleteUserByIdSchema } from "#admin/user/validations/userAdminValidation.js";
import { t } from "#utils/i18n/index.js";
import { Datatable } from '#helpers/datatable.js';

export class UserAdminController {

    constructor({ userService }){
        this.userService = userService;
    }
    
    deleteById = async (req, res) => {
        try {
            const validation = await validateRequest(deleteUserByIdSchema, req.params);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });
            
            const { id } = validation.data;
    
            const user = await this.userService.deleteById(id);
            if(!user) return res.status(404).json({ message: t('user:userNotFound') });
    
            return res.status(200).json({ message: t('user:userDeleted') });
        } catch (error) {
            console.log("Error", error);
            return res.status(500).json({ message: t('user:failedToDeleteUser') });
        }
    }

    getAll = async (req, res) => {
        try {
            const users = await this.userService.getAll();
    
            return res.status(200).json({ 
                message: t('user:usersRetrieved'), 
                data: users,
            });
        } catch (error) {
            return res.status(500).json({ error: t('user:errorRetrievingUsers') });
        }
    }
    
    datatable = async (req, res) => {
        try {
            const users = await this.userService.getAll();
            const usersFormatted = formatUsers(users);
    
            const datatable = new Datatable(usersFormatted, req.query)
            const response = await datatable.toJson();
    
            return res.status(200).json({ 
                message: t('user:usersRetrieved'), 
                data: response.data,
                totalCount: response.totalCount,
            });
        } catch (error) {
            return res.status(500).json({ error: t('user:errorRetrievingUsers') });
        }
    }
}
