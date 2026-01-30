import { t } from "#utils/i18n/index.js";
import { comparePassword } from "#utils/crypto/password.js";

export const verifyPassword = (userService) => async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: t('auth:passwordIsRequired') });

    const user = await userService.findById(req.user.id);
    if (!user) return res.status(404).json({ message: t('user:userNotFound') });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: t('auth:incorrectPassword') });

    return next();
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: t('auth:verifyPasswordMiddlewareError') });
  }
}
