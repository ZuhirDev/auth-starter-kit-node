import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { t } from "#utils/i18n/index.js";

export const generateToken = (payload, secret, expiresIn = '15m') => {
  return jwt.sign(payload, secret, { expiresIn });
}

export const generateTempToken = async (expieresTime = 30) => {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  const expires = Date.now() + expieresTime * 60 * 1000;

  return { rawToken, tokenHash, expires };
}

export const validateTempToken = async (rawToken, hashToken, expirationTime) => {
  
  if (Date.now() > expirationTime) return { valid: false, message: t('auth:tokenHasExpired') };

  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  if (tokenHash !== hashToken) return { valid: false, message: t('auth:tokenIsInvalid') };

  return { valid: true };
}
