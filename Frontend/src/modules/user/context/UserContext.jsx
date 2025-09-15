import { createContext, useContext } from "react";
import { forgotPasswordService, passwordResetService, sendVerifyEmailService, updatePasswordService, updateService, verifyEmailService } from "@user/service/userService";
import { useAuth } from "@/modules/auth/context/AuthContext";

const userContext = createContext();

export const UserProvider = ({ children }) => {

    const { fetchData } = useAuth();

    const update = async (data) => {
        try {
            const response = await updateService(data);
            await fetchData();

            return response;
        } catch (error) {
            throw error;
        }
    }

    const updatePassword = async (passwords) => {
        try {
            const response  = await updatePasswordService(passwords);
            return response;            
        } catch (error) {
            throw error;
        }
    }

    const forgotPassword = async (data) => {
        try {
            const response = await forgotPasswordService(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const passwordReset = async (data) => {
        try {
            const response = await passwordResetService(data);
            return response;            
        } catch (error) {
            throw error;
        }
    }


    const sendVerifyEmail = async () => {
        try {
            const response = await sendVerifyEmailService();
            return response;            
        } catch (error) {
            throw error;
        }
    }

    const verifyEmail = async (data) => {
        try {
            const response = await verifyEmailService(data);
            await fetchData();

            return response;            
        } catch (error) {
            throw error;
        }
    }

    const value = {
        update,
        updatePassword,
        forgotPassword,
        passwordReset,
        sendVerifyEmail,
        verifyEmail,
    }

    return(
        <userContext.Provider value={ value } >
            { children }
        </userContext.Provider>
    );
}

export const useUser = () =>  {

    const context = useContext(userContext);

    if(!context){
        throw new Error("useUser debe estar dentro del proveedor UserProvider");
    }
    
    return context;
}