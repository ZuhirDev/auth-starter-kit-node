
export class UserPermissionService {

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  assignPermissionsToUser = async (userId, permissionIds = []) => {
    if (!permissionIds.length) return null;

    const existingIds = await this.userRepository.getUserPermissionIds(userId);

    const newIds = permissionIds.filter(
      (id) => !existingIds.includes(id)
    );

    if (!newIds.length) return null;

    await this.userRepository.assignPermissions(userId, newIds);

    return true;
  }

  removePermissionsFromUser = async (userId, permissionIds = []) => {
    if (!permissionIds.length) return null;

    const existingIds = await this.userRepository.getUserPermissionIds(userId);

    const idsToRemove = permissionIds.filter(
      (id) => existingIds.includes(id)
    );

    if (!idsToRemove.length) return null;

    await this.userRepository.removePermissions(userId, idsToRemove);

    return true;
  }

  getUserPermissions = async (userId) => {
    return await this.userRepository.getUserPermission(userId);
  }

  getEffectivePermissions = async (userId) => {
    const permissions = await this.userRepository.getEffectivePermissions(userId);
    return new Set(permissions.map(p => `${p.name}:${p.resource}`));
  }

}