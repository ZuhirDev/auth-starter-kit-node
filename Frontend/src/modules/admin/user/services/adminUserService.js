import { del, patch, post } from "@/utils/xhr";

export const createUserService = async (data) => {
    const { name, resource, description } = data;

    try {
        const response = await post({
            url: `/users`,
            data: {
                name, 
                resource,
                description
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateUserService = async (data) => {
    const { id, name, resource, description } = data; 

    try {
        const response = await patch({
            url: `/users`,
            data: {
                id,
                name, 
                resource,
                description
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUserService = async (data) => {
    const { id } = data;

    try {
        const response = await del({
            url: `/user/${id}`,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const assignRolesToUserService = async (data) => {
    const { id, roleIds } = data;

    try {
        const response = await post({
            url: `/user/assign-roles`,
            data: {
                userId: id,
                roleIds,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeRolesToUserService = async (data) => {
    const { id, roleIds } = data;

    try {
        const response = await post({
            url: `/user/remove-roles`,
            data: {
                userId: id,
                roleIds,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const assignPermissionsToUserService = async (data) => {
    const { id, permissionIds } = data;

    try {
        const response = await post({
            url: `/user/assign-permissions`,
            data: {
                userId: id,
                permissionIds,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removePermissionsToUserService = async (data) => {
    const { id, permissionIds } = data;

    try {
        const response = await post({
            url: `/user/remove-permissions`,
            data: {
                userId: id,
                permissionIds,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}