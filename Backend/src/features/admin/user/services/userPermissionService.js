

export const assignPermissionsToUserService = async (user, permissionIds = []) => {
    const existsPerm = user.permissions.map((perm) => perm._id.toString());

    const newIds = permissionIds.filter((id) => !existsPerm.includes(id));

    if (newIds.length === 0) return null;

    user.permissions.push(...newIds);
    await user.save();

    return user;
}

export const removePermissionsFromUserService = async (user, permissionIds = []) => {
    if (!permissionIds.length) return user;

    user.permissions = user.permissions.filter(
        (perm) => !permissionIds.includes(perm._id.toString())
    );

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