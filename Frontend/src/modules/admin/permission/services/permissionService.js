import { del, get, patch, post } from "@/utils/xhr";

export const createPermissionService = async (data) => {
    const { name, resource, description } = data;

    try {
        const response = await post({
            url: `/permissions`,
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

export const updatePermissionService = async (data) => {
    const { id, name, resource, description } = data; 

    try {
        const response = await patch({
            url: `/permissions`,
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

export const deletePermissionService = async (data) => {
    const { id } = data;

    try {
        const response = await del({
            url: `/permissions/${id}`,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAllPermissionsService = async () => {

    try {
        const response = await get({
            url: `/permissions`,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}