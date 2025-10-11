import User from "#user/models/user.js";
import { verifyOAuthGoogle } from "#auth/providers/google.js";
import bcrypt from 'bcryptjs';
import { effectivePermissionsService } from "#admin/user/services/userPermissionService.js";
import { logger } from "#admin/log/controllers/logController.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const formatUser = (user, effectivePermissions = null) => {
  if (!user) return null;
  
  const userObj = user.toObject ? user.toObject() : user;
  const { id, name, email, is2FAVerified, email_verified_at,permissions, roles } = userObj;

  return { id, name, email, is2FAVerified, email_verified_at, permissions, roles, effectivePermissions: Array.from(effectivePermissions || []) };
};

export const formatUsers = (users, effectivePermissions = null) => {
  return users.map((user) => formatUser(user, effectivePermissions));
}

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

export const createOAuthUserService = async ({ name, email, avatar = null }) => { // AÑADIR AVATAR

  const user = new User({name, email, password: null, email_verified_at: new Date()});
  await user.save();

  return user;
};

export const meService = async (user) => {
  return await findUserById(user.id);
}

export const getAllUsersService = async () => {
  return await User.find().populate('permissions').populate('roles');
}

export const oAuthService = async ({ provider, token }) => {

  let userData = null;

  switch(provider){

    case 'google':
      userData = await verifyOAuthGoogle(token);
      break;
    default: 
      throw new Error('Unsopported provider', provider);
  }

  let user = await findUserByEmail(userData.email);
  if(!user){
    user = await createOAuthUserService(userData);

    await logger({
      user_id: user.id,
      action: 'registerOAuth',
      module: 'auth',
    });    
  } 

  const permissions = await effectivePermissionsService(user);

  return { user, permissions };
}