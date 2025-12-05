import { get, patch } from "@/utils/xhr";

export const getAllConfigService = async () => {

    try {
        const response = await get({
            url: `/config/public`,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateConfigService = async (data) => {
    const { id, value, description, isPublic } = data; 

    try {
        const response = await patch({
            url: `/config`,
            data: {
                id,
                value,
                description, 
                isPublic,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}