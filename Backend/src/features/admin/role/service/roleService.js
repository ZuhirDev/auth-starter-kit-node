import Role from "#admin/role/models/role.js";

export const createRoleService = async (name, description, permissions) => {
  const role = new Role({ name, description, permissions });

  return await role.save();
}

export const updateRoleService = async (id, { name, description, permissions }) => {
  const role = await Role.findByIdAndUpdate(id, { name, description, permissions }, { new: true });
  if(!role) return null;

  return role;
}

export const getAllRolesService = async () => {
  return await Role.find().populate('permissions');
}

export const getRoleByIdService = async (id) => {
  return await Role.findById(id).populate('permissions');
}

export const addPermissionsToRoleService = async (role, permissionIds) => {
  const existingPermissionIds = new Set(role.permissions.map(p => p.toString()));
  const newPermissionIds = permissionIds.filter(id => !existingPermissionIds.has(id.toString()));

  if (newPermissionIds.length === 0) return null;

  role.permissions.push(...newPermissionIds);
  await role.save();

  return role;
}

export const removePermissionsFromRoleService = async (role, permissionIds) => {
  const idsToRemove = new Set(permissionIds.map(id => id.toString()));

  const updatedPermissions = role.permissions.filter(perm => {
    const permId = perm.id?.toString?.() || perm.toString()
    return !idsToRemove.has(permId)
  })

  if (updatedPermissions.length === role.permissions.length) return null;

  role.permissions = updatedPermissions
  await role.save()

  return role;
}

export const deleteRoleService = async (id) => {
  return await Role.findByIdAndDelete(id);
}
