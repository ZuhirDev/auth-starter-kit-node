


export const assignRoleToUserService = async (user, roleId) => {
    if (user.roles.includes(roleId)) return null;

    user.roles.push(roleId);
    await user.save();

    return user;
}

export const removeRoleFromUserService = async (user, roleId) => {
    if (!user.roles.map((role) => role._id.toString()).includes(roleId)) return null;

    user.roles = user.roles.filter((role) => role._id.toString() !== roleId);
    await user.save();

    return user;
}

export const hasRoleService = (user, roleName) => {
    return user.roles.some((role) => role.name === roleName);
}

export const hasRolePermissionService = (user, permissionName, permissionResource) => {
    return user.roles.some((role) => role.permissions.some((permission) => permission.name === permissionName && permission.resource === permissionResource));
}