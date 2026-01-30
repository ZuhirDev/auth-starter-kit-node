
export class UserRoleService {

  constructor({ userRepository }){
    this.userRepository = userRepository;
  }

  assignRolesToUser = async (userId, roleIds = []) => {
    if (!roleIds.length) return null;

    const assigned = await this.userRepository.assignRoles(userId, roleIds);
    return assigned ? true : null;
  }

  removeRolesFromUser = async (userId, roleIds = []) => {
    if (!roleIds.length) return null;

    const result = await this.userRepository.removeRoles(userId, roleIds);
    return result ? true : null;
  }

  getUserRoles = async (userId) => {
    return await this.userRepository.getUserRole(userId);
  }

}