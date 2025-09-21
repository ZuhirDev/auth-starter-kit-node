

export const assignPermissionToUserService = async (user, permissionId) => {
    if (user.permissions.includes(permissionId)) return null;

    user.permissions.push(permissionId);
    await user.save();

    return user;
}

export const removePermissionFromUserService = async (user, permissionId) => {
    if (!user.permissions.map((perm) => perm._id.toString()).includes(permissionId)) return null;

    user.permissions = user.permissions.filter((permission) => permission._id.toString() !== permissionId);
    await user.save();

    return user;
}

export const hasPermissionService = (user, permissionName, permissionResource) => {
    return user.permissions.some((permission) => permission.name === permissionName && permission.resource === permissionResource);
}

export const effectivePermissionsService = async (user) => {

    if(!user) return null;

    await user.populate([
        { path: 'permissions' },
        { path: 'roles', populate: { path: 'permissions', model: 'Permission' } }
    ]);

    const effectivePermissions = new Map();

    user.permissions.forEach(permission => {
        effectivePermissions.set(`${permission.name}:${permission.resource}`, true);
    });

    user.roles.forEach(role => {
        role.permissions.forEach(permission => {
            effectivePermissions.set(`${permission.name}:${permission.resource}`, true);
        });
    });

    return effectivePermissions;
}