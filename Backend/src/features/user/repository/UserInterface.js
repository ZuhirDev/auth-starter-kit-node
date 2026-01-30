export class UserInterface {
    findById = async (id) => {
        throw new Error('Method "findById" must be implemented');
    };

    findByEmail = async (email) => {
        throw new Error('Method "findByEmail" must be implemented');
    };

    updateById = async (id, data) => {
        throw new Error('Method "updateById" must be implemented');
    };

    create = async (data) => {
        throw new Error('Method "create" must be implemented');
    };

    getAll = async () => {
        throw new Error('Method "getAll" must be implemented');
    };

    deleteById = async (id) => {
        throw new Error('Method "deleteById" must be implemented');
    };

    // PERMISSIONS

    assignPermissions = async (userId, permissionIds) => {
        throw new Error('Method "assignPermissions" must be implemented');
    }

    removePermissions = async (userId, permissionIds) => {
        throw new Error('Method "removePermissions" must be implemented');
    }

    getUserPermission = async (userId) => {
        throw new Error('Method "getUserPermission" must be implemented');
    }

    getUserPermissionIds = async (userId) => {
        throw new Error('Method "getUserPermissionIds" must be implemented');
    }

    getEffectivePermissions = async (userId) => {
        throw new Error('Method "getEffectivePermissions" must be implemented');
    }

    // ROLES

    getUserRole = async (userId) => {
        throw new Error('Method "getUserRole" must be implemented');
    }

    getUserRoleIds = async (userId) => {
        throw new Error('Method "getUserRoleIds" must be implemented');
    }

    assignRoles = async (userId, roleIds) => {
        throw new Error('Method "assignRoles" must be implemented');
    }

    removeRoles = async (userId, roleIds) => {
        throw new Error('Method "removeRoles" must be implemented');
    }
}
