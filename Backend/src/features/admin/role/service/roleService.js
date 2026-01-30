export class RoleService {
    constructor({ roleRepository }) {
      this.roleRepository = roleRepository;
    }

    create = async ({ name, description, permissions }) => {
      return await this.roleRepository.create({ name, description, permissions });
    }

    getAll = async () => {
      return await this.roleRepository.getAll();
    }

    findById = async (id) => {
      return await this.roleRepository.findById(id);
    }

    updateById = async (id, data) => {
      return await this.roleRepository.updateById(id, data);
    }

    deleteById = async (id) => {
      return await this.roleRepository.deleteById(id);
    }

    addPermissionsToRole = async (roleId, permissionIds) => {
      const role = await this.findById(roleId);
      if (!role) return null;

      const existingPermissionIds = new Set(role.permissions.map(p => p.toString()));
      const newPermissionIds = permissionIds.filter(id => !existingPermissionIds.has(id.toString()));
      if (newPermissionIds.length === 0) return null;

      role.permissions.push(...newPermissionIds);
      await role.save();

      return role;
    }

    removePermissionsFromRole = async (roleId, permissionIds) => {
      const role = await this.findById(roleId);
      if (!role) return null;

      const idsToRemove = new Set(permissionIds.map(id => id.toString()));
      const updatedPermissions = role.permissions.filter(perm => {
          const permId = perm.id?.toString?.() || perm.toString();
          return !idsToRemove.has(permId);
      });

      if (updatedPermissions.length === role.permissions.length) return null;

      role.permissions = updatedPermissions;
      await role.save();

      return role;
    }
}
