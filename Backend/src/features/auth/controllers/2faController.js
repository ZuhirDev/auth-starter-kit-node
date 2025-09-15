import { enable2FAService, verify2FAService } from '#auth/services/2faService.js';
import { updateUserById } from '#user/services/userService.js';

export const enable2FA = async (req, res) => {
  try {
    const user = req.user;

    if(user.twoFASecret)  return res.status(401).json({ message: '2FA already enabled' });

    const { secret, qrCode } = await enable2FAService(user.email);

    await updateUserById(user._id, { twoFASecret: secret });

    return res.status(200).json({ message: '2FA enabled successfully' , secret, qrCode });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: 'Failed to enable 2FA' });
  }
} 

export const verify2FA = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = req.user;

    if(user.is2FAVerified === true) return res.status(401).json({ message: '2FA already verified' });

    const isValid = await verify2FAService(user.email, otp, user.twoFASecret);
    if(!isValid) return res.status(401).json({ message: 'Invalid authentication code' });

    await updateUserById(user._id, { is2FAVerified: true });

    return res.status(200).json({ message: '2FA verified successfully'});
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: '2FA Verification failed' });
  }
} 

export const disable2FA = async (req, res) => {
  try {
    const user = req.user;

    if (!user.twoFASecret) return res.status(400).json({ message: '2FA is not enabled' });

    await updateUserById(user._id, { twoFASecret: null, is2FAVerified: false, });

    return res.status(200).json({ message: '2FA disabled successfully'});
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({ message: '2FA Verification failed' });
  }
} 