export const formatUser = (user, effectivePermissions = null) => {
    if (!user) return null;

    const userObj = typeof user.toObject === 'function'
        ? user.toObject()
        : user;

    const {
        id,
        name,
        email,
        is2FAVerified,
        is2FAActivated,
        email_verified_at,
        permissions,
        roles
    } = userObj;

    return {
        id,
        name,
        email,
        is2FAVerified,
        is2FAActivated,
        email_verified_at,
        permissions,
        roles,
        effectivePermissions: Array.from(effectivePermissions || [])
    };
};

export const formatUsers = (users = [], effectivePermissions = null) => {
  return users.map(user => formatUser(user, effectivePermissions));
};
