import { createContext, useContext, useEffect, useState } from "react";
import { getAllConfigService } from "@admin/config/services/configService";

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {

    const [configs, setConfigs] = useState({});

    const fetchConfigs = async () => {
        try {
            const response = await getAllConfigService();
            const map = response.data.reduce((acc, c) => {
                acc[c.key] = c.value;
                return acc;
            }, {});
            setConfigs(map);

        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        fetchConfigs();
    }, []);

    const value = {
        configs,
        fetchConfigs,
    }

    return(
        <ConfigContext.Provider value={ value } >
            { children }
        </ConfigContext.Provider>
    );
}

export const useConfig = () => {
    const context = useContext(ConfigContext);

    if(!context){
        throw new Error("useConfig debe estar dentro del proveedor ConfigProvider");
    }

    return context;
}