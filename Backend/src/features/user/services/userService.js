import { verifyOAuthGoogle } from "#auth/providers/google.js";
import bcrypt from 'bcryptjs';

export class UserService {

  constructor({ userRepository, logService, userPermissionService }){
    this.userRepository = userRepository;
    this.logService = logService;
    this.userPermissionService = userPermissionService;
  }

  findByEmail = async (email) => {
    return await this.userRepository.findByEmail(email);
  };

  findById = async (id) => {
    return await this.userRepository.findById(id);
  };

  updateById = async (id, updateData) => {
    return await this.userRepository.updateById(id, updateData);
  };

  updatePassword = async (id, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.updateById(id, { password: hashedPassword });  
  };
  
  create = async ({ name, email, password }) => {  
    const passwordHashed = await bcrypt.hash(password, 10);

    return await this.userRepository.create({name, email, password: passwordHashed });
  };
  
  createOAuth = async ({ name, email }) => {
    return await this.userRepository.create({ name, email, password: null, email_verified_at: new Date() });
  };

  me = async (user) => {
    return this.findById(user.id);
  }

  getAll = async () => {
    return await this.userRepository.getAll();
  }

  deleteById = async (id) => {
    return await this.userRepository.deleteById(id);
  }

  oAuth = async ({ provider, token }) => {
    let userData = null;

    switch(provider){

      case 'google':
        userData = await verifyOAuthGoogle(token);
        break;
      default: 
        throw new Error('Unsopported provider', provider);
    }

    let user = await this.findByEmail(userData.email);
    if(!user){
      user = await this.createOAuth(userData);

      await this.logService.logger({
        user_id: user.id,
        action: 'registerOAuth',
        module: 'auth',
      });    
    } 

    const permissions = await this.userPermissionService.getEffectivePermissions(user);
    return { user, permissions };
  }

}