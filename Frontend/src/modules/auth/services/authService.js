import { post } from '@/utils/xhr';

export const registerService = async (data) => {
    const { name, email, password, password_confirmation } = data;
    try {
        const response = await post({
            url: '/register',
            data: {
                name,
                email,
                password,
                password_confirmation,
            }
        });

        return response.data;
    } catch (error) { 
        throw error;
    }
}


export const loginService = async (data) => {
    const { email, password } = data;
    try {
        const response = await post({
            url: '/login',
            data: {
                email,
                password,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logoutService = async () => {
    try {
        const response = await post({url: '/logout'});

        return response.data; 
    } catch (error) {
        throw error;
    }
}

export const enable2FAService = async (data) => {
    const { password } = data;
    try {
        const response = await post({
            url: '/2fa/enable',
            data: {
                password,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const verify2FAService = async (data) => {
    const { otp } = data;
    try {
        const response = await post({
            url: '/2fa/verify',
            data: {
                one_time_password: otp,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const disable2FAService = async (data) => {
    const { password } = data;
    try {
        const response = await post({ 
            url: '/2fa/disable ',
            data: {
                password,
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const passwordVerificationService = async (data) => {
    const { password } = data;
    try {
        const response = await post({
            url: '/validate-password',
            data: {
                password,
            }
        });
        
        return response.data;
    } catch (error) {
        throw error;
    }
}
