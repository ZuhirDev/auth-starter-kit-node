import { createContext, useContext, useEffect, useState } from "react";
import { disable2FAService, enable2FAService, loginService, logoutService, registerService, verify2FAService } from "@auth/services/authService";
import { meService } from "@/modules/user/service/userService";

const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => { 

    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;
    
    const fetchData = async () => {
        try {
            const response = await meService();
            setUser({...response.data, need_verify_2fa: response.need_verify_2fa });
    
        } catch (error) {
            console.log("Error: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const register = async (data) => {
        try {
            const response = await registerService(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const login = async (data) => {
        try {
            const response = await loginService(data);
            await fetchData();

            return response;
        } catch (error) {
            throw error;
        }
    }

    const logout = async () => {
        try {
            const response = await logoutService();
            return response;        
        } catch (error) {
            throw error;
        }
    }


    const enable2FA = async (data) => {
        try {
            const response = await enable2FAService(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const verify2FA = async (data) => {
        try {
            const response = await verify2FAService(data);
            await fetchData();
            return response            
        } catch (error) {
            throw error;
        }
    }

    const disable2FA = async (data) => {
        try {
            const response = await disable2FAService(data);
            await fetchData();
            return response; 
        } catch (error) {
            throw error;
        }
    }

    const value = {
        register,
        login,
        logout,
        user, 
        isAuthenticated,
        enable2FA,
        verify2FA,
        disable2FA,
        loading,
        setUser,
        setLoading,
        fetchData,
    }

    return(
        <AuthContext.Provider value={ value } >
            {children}
        </AuthContext.Provider>
    ); 
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
    } 
 
    return context;       
}     