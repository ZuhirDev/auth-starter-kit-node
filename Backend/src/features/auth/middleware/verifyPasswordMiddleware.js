import { findUserById } from "#user/services/userService.js";
import bcrypt from 'bcryptjs';

export const verifyPassword = async (req, res, next) => {

    try {
        const { password } = req.body;
        if (!password) return res.status(400).json({ message: 'Password is required' });

        const user = await findUserById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

        return next();
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: 'Error in verifyPassword Middleware ' });
    }
}