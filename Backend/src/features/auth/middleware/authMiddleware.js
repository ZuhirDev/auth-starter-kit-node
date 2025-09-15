import CONFIG from "#config/config.js";
import { findUserById } from "#user/services/userService.js";
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });
    
    try {
        const decoded = jwt.verify(token, CONFIG.JWT_SECRET);

        const user = await findUserById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}