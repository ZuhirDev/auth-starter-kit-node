import { get, post } from '@/utils/xhr';


export const meService = async () => {
    try {
        const response = await get({url: '/me'});

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateService = async (data) => {
    const { name } = data;

    try {
        const response = await post({
            url: '/update',
            data: {
                name,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updatePasswordService = async (data) => {
    const { current_password, password, password_confirmation } = data;

    try {
        const response = await post({
            url: '/update-password',
            data: {
                current_password,
                password,
                password_confirmation,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const forgotPasswordService = async (data) => {
    const { email } = data;
    try {
        const response = await post({
            url: '/forgot-password', 
            data: {
                email,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const passwordResetService = async (data) => {
    const { email, password, password_confirmation, token } = data;
    try {
        const response = await post({
            url: '/password-reset',
            data: {
                email,
                password,
                password_confirmation,
                token,
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const sendVerifyEmailService = async () => {
    try {
        const response = await post({ url: 'send-verify-email' })
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const verifyEmailService = async (data) => {
    const { url } = data;
    
    try {
        const response = await get({
            url: url
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
