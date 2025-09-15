
export const validateRequest = async (schema, data) => {

    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        return {
            success: false,
            errors,
        };
    }

    return {
        success: true,
        data: result.data,
    };
}