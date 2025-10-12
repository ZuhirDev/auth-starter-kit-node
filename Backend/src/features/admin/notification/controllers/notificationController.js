import { getAllUsersService } from "#user/services/userService.js";
import { validateRequest } from "#utils/validation.js";
import { dispatch } from '../../../../index.js';
import { notificationSchema } from "#admin/notification/validations/notificationValidation.js";

export const notification = async (req, res) => {
    try {
        const validation = await validateRequest(notificationSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { type, title, message } = validation.data;

        const users = await getAllUsersService();
        users.filter((user) => user.id !== req.user.id).forEach((user) => {
            dispatch.to(`notifications:${user?.id}`).emit("notification",{ type,title,message });
        })
        
        return res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
        console.log("Error", error);
    }
}