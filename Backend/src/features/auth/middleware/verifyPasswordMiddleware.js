import { findUserById } from "#user/services/userService.js";
import bcrypt from 'bcryptjs';
import { t } from "#utils/i18n/index.js";

export const verifyPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: t('auth:passwordIsRequired') });

    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: t('user:userNotFound') });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: t('auth:incorrectPassword') });

    return next();
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: t('auth:verifyPasswordMiddlewareError') });
  }
}
