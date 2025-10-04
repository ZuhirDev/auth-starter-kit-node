import { del, get, patch, post } from "@/utils/xhr";

export const getAllRolesService = async (data) => {

    try {
        const response = await get({
            url: `/roles`,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createRoleService = async (data) => {
    const { name, resource, description } = data;

    try {
        const response = await post({
            url: `/roles`,
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

export const updateRoleService = async (data) => {
    const { id, name, resource, description } = data; 

    try {
        const response = await patch({
            url: `/roles`,
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

export const deleteRoleService = async (data) => {
    const { id } = data;

    try {
        const response = await del({
            url: `/roles/${id}`,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addPermissionToRoleService = async (data) => {
    const { id, permissionIds } = data;
    
    try {
        const response = await post({
            url: '/roles/add-permission',
            data: {
                id,
                permissionIds,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removePermissionToRoleService = async (data) => {
    const { id, permissionIds } = data;
    
    try {
        const response = await post({
            url: '/roles/remove-permission',
            data: {
                id,
                permissionIds,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}