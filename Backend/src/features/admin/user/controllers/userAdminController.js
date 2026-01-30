import { validateRequest } from '#utils/validation.js';
import { deleteUserByIdSchema } from "#admin/user/validations/userAdminValidation.js";
import { deleteUserByIdService } from "#user/services/userService.js";
import { t } from "#utils/i18n/index.js";

export const deleteUserById = async (req, res) => {
    try {
        const validation = await validateRequest(deleteUserByIdSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });
        
        const { id } = validation.data;

        const user = await deleteUserByIdService(id);
        if(!user) return res.status(404).json({ message: t('user:userNotFound') });

        return res.status(200).json({ message: t('user:userDeleted') });
    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ message: t('user:failedToDeleteUser') });
    }
}