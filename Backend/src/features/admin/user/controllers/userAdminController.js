import { validateRequest } from '#utils/validation.js';
import { deleteUserByIdSchema } from "#admin/user/validations/userAdminValidation.js";
import { deleteUserByIdService } from "#user/services/userService.js";

export const deleteUserById = async (req, res) => {
    try {
        const validation = await validateRequest(deleteUserByIdSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });
        
        const { id } = validation.data;

        const user = await deleteUserByIdService(id);
        if(!user) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log("Error", error);
    }
}