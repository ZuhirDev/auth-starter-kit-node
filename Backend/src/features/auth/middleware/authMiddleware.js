import CONFIG from "#config/config.js";
import { findUserById } from "#user/services/userService.js";
import jwt from 'jsonwebtoken';
import { t } from "#utils/i18n/index.js";

export const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: t('auth:unauthenticatedTokenNotProvided') });
    
    try {
        const decoded = jwt.verify(token, CONFIG.JWT_SECRET);

        const user = await findUserById(decoded.id);
        if (!user) return res.status(404).json({ message: t('user:userNotFound') });

        user.effectivePermissions = new Set(decoded.permissions);

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: t('auth:unauthorizedInvalidOrExpiredToken') });
    }
}
