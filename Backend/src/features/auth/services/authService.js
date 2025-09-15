import bcrypt from 'bcryptjs';

export const VerifyPasswordService = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};