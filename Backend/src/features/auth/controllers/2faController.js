import { enable2FAService, verify2FAService } from '#auth/services/2faService.js';
import { updateUserById } from '#user/services/userService.js';
import { t } from "#utils/i18n/index.js";

export const enable2FA = async (req, res) => {
  try {
    const user = req.user;

    if (user.twoFASecret) return res.status(401).json({ message: t('auth:twoFAAlreadyEnabled') });

    const { secret, qrCode } = await enable2FAService(user.email);

    await updateUserById(user.id, { twoFASecret: secret });

    return res.status(200).json({ message: t('auth:twoFAEnabledSuccessfully'), secret, qrCode });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: t('auth:twoFAEnableFailed') });
  }
}

export const verify2FA = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = req.user;

    if (user.is2FAVerified === true) return res.status(401).json({ message: t('auth:twoFAAlreadyVerified') });

    const isValid = await verify2FAService(user.email, otp, user.twoFASecret);
    if (!isValid) return res.status(401).json({ message: t('auth:invalidAuthenticationCode') });

    await updateUserById(user.id, { is2FAVerified: true });

    return res.status(200).json({ message: t('auth:twoFAVerifiedSuccessfully') });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: t('auth:twoFAVerifyFailed') });
  }
}

export const disable2FA = async (req, res) => {
  try {
    const user = req.user;

    if (!user.twoFASecret) return res.status(400).json({ message: t('auth:twoFANotEnabled') });

    await updateUserById(user.id, { twoFASecret: null, is2FAVerified: false });

    return res.status(200).json({ message: t('auth:twoFADisabledSuccessfully') });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: t('auth:twoFADisableFailed') });
  }
}
