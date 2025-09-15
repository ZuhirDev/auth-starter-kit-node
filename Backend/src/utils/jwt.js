import CONFIG from '#config/config.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateToken = (payload) => {
    return jwt.sign(payload, CONFIG.JWT_SECRET, {
        expiresIn: '30m',
    });
}

export const generateTempToken = async (expieresTime = 30) => {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expires = Date.now() + expieresTime * 60 * 1000;

    return { rawToken, tokenHash, expires };
}

export const validateTempToken = async (rawToken, hashToken, expirationTime) => {
  
  if (Date.now() > expirationTime) return { valid: false, message: 'Token has expired' };

  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  if (tokenHash !== hashToken) return { valid: false, message: 'Invalid token' };

  return { valid: true };
}

