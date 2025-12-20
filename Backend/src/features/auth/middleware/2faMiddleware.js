import { t } from "#utils/i18n/index.js";

export const TwoFA = async (req, res, next) => {
    try {
        const user = req.user;

        if (user.twoFASecret && user.is2FAVerified === false) return res.status(401).json({ message: t('auth:twoFAVerificationRequired') });

        return next();
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({ message: t('auth:twoFAMiddlewareError') });
    }
}
