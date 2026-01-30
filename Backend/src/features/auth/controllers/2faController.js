import { enable2FAService, verify2FAService } from '#auth/services/2faService.js';
import { t } from "#utils/i18n/index.js";
export class TwoFAController {

  constructor({ userService, logService }){
    this.userService = userService;
    this.logService = logService;
  }

  enable2FA = async (req, res) => {
    try {
      const user = req.user;
  
      if (user.twoFASecret) return res.status(401).json({ message: t('auth:twoFAAlreadyEnabled') });
  
      const { secret, qrCode } = await enable2FAService(user.email);
  
      await this.userService.updateById(user.id, { twoFASecret: secret });
  
      return res.status(200).json({ message: t('auth:twoFAEnabledSuccessfully'), secret, qrCode });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json({ message: t('auth:twoFAEnableFailed') });
    }
  }

  verify2FA = async (req, res) => {
    try {
      const { otp } = req.body;
      const user = req.user;
  
      if (user.is2FAVerified === true) return res.status(401).json({ message: t('auth:twoFAAlreadyVerified') });
  
      const isValid = await verify2FAService(user.email, otp, user.twoFASecret);
      if (!isValid) {
  
        await this.logService.logger({
          user_id: user.id,
          action: 'verify2FA',
          module: 'auth',
          ip_address: req.ip,
          status: "error"
        });
  
        return res.status(401).json({ message: t('auth:invalidAuthenticationCode') });
      }
        
      await this.userService.updateById(user.id, { is2FAVerified: true, is2FAActivated: true });
  
      return res.status(200).json({ message: t('auth:twoFAVerifiedSuccessfully') });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json({ message: t('auth:twoFAVerifyFailed') });
    }
  }
  
  disable2FA = async (req, res) => {
    try {
      const user = req.user;
  
      if (!user.twoFASecret) return res.status(400).json({ message: t('auth:twoFANotEnabled') });
  
      await this.userService.updateById(user.id, { twoFASecret: null, is2FAVerified: false, is2FAActivated: false });
  
      return res.status(200).json({ message: t('auth:twoFADisabledSuccessfully') });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(500).json({ message: t('auth:twoFADisableFailed') });
    }
  }
}



