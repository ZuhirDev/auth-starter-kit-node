import Permission from "#rbac/models/permission.js";

export const createPermissionService = async (name, resource, description) => {
    const permission = new Permission({ name, resource, description });

    return await permission.save();
}

export const getAllPermissionsService = async () => {
    return await Permission.find();
}

export const getPermissionByIdService = async (id) => {
    return await Permission.findById(id);
}

export const updatePermissionService = async (id, { name, resource, description }) => {
    const permission = await Permission.findByIdAndUpdate(id, { name, resource, description }, { new: true });
    if(!permission) return null;

    return permission;
}

export const deletePermissionService = async (id) => {
    const permission = await Permission.findByIdAndDelete(id);
    if(!permission) return null;

    return permission;
}
