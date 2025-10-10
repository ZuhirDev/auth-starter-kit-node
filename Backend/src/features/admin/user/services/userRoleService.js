


export const assignRolesToUserService = async (user, roleIds = []) => {
  const existingRoleIds = user.roles.map((r) => r.toString());

  const newRoles = roleIds.filter((id) => !existingRoleIds.includes(id));

  if (newRoles.length === 0) return user;

  user.roles.push(...newRoles);

  await user.save();
  return user;
}

export const removeRolesFromUserService = async (user, roleIds = []) => {
  const existingRoleIds = user.roles.map((r) => r.id.toString());

  const rolesToRemove = roleIds.filter((id) => existingRoleIds.includes(id.toString()));

  if (rolesToRemove.length === 0) return user;

  user.roles = user.roles.filter((role) => !rolesToRemove.includes(role.id.toString()));

  await user.save();
  return user;
};

export const hasRoleService = (user, roleName) => {
    return user.roles.some((role) => role.name === roleName);
}

export const hasRolePermissionService = (user, permissionName, permissionResource) => {
    return user.roles.some((role) => role.permissions.some((permission) => permission.name === permissionName && permission.resource === permissionResource));
}