import CONFIG from '#config/config.js';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';

export const enable2FAService = async (email) => {

    const totp = new OTPAuth.TOTP({
        issuer: CONFIG.APP_NAME,
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
    });

    const secret = totp.secret.base32;
    const otpauth = totp.toString();
    const qrCode = await QRCode.toDataURL(otpauth);

    return { secret, qrCode};
}

export const verify2FAService = async (email, token, userSecret) => {
    const totp = new OTPAuth.TOTP({
        issuer: CONFIG.APP_NAME,
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(userSecret),
    });

    const delta = totp.validate({token, window: 1});

    return delta !== null;
}