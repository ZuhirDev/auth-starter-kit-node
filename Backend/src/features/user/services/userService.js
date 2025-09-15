import User from "#user/models/user.js";
import bcrypt from 'bcryptjs';

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const formatUser = (user) => {
  if (!user) return null;

  const userObj = user.toObject ? user.toObject() : user;

  const { _id, name, email, is2FAVerified, email_verified_at } = userObj;

  return { _id, name, email, is2FAVerified, email_verified_at };
};


export const updateUserById = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

export const updatePasswordService = async (id, password) => {
  
  const hashedPassword = await bcrypt.hash(password, 10);

  return await User.findByIdAndUpdate(id, { password: hashedPassword }, {
    new: true,
    runValidators: true,
  });
};

export const createUserService = async ({ name, email, password }) => {

  const passwordHashed = await bcrypt.hash(password, 10);

  const user = new User({name, email, password: passwordHashed});
  await user.save();

  return user;
};

export const meService = async (req) => {
  return await findUserById(req?.user?.id);
}