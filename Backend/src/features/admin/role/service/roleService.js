import Role from "#admin/role/models/role.js";

export const createRoleService = async (name, description, permissions) => {
  const role = new Role({ name, description, permissions });

  return await role.save();
}

export const getAllRolesService = async () => {
  return await Role.find().populate('permissions');
}

export const getRoleByIdService = async (id) => {
  return await Role.findById(id).populate('permissions');
}

export const addPermissionToRoleService = async (role, permissionId) => {
  if(role.permissions.some(p => p.toString() === permissionId.toString())) return null;

  role.permissions.push(permissionId);
  await role.save();
  
  return role;
}

export const removePermissionFromRoleService = async (role, permissionId) => {
  if(!role.permissions.some(p => p._id.toString() === permissionId.toString())) return null;

  role.permissions = role.permissions.filter((permId) => permId._id.toString() !== permissionId.toString());
  await role.save();

  return role;
}

export const deleteRoleService = async (id) => {
  return await Role.findByIdAndDelete(id);
}
