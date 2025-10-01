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