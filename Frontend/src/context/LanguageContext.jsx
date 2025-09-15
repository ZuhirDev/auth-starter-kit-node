import { createContext, useContext, useEffect, useState } from "react";
import i18n from "@/utils/i18n";
import { get } from "@/utils/xhr";
import Loading from "@/components/Loading";
import useModal from "@/hooks/useModal";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {

    const [language, setLanguage] = useState(null);
    const [languages, setLanguages] = useState([]);
    const { isOpen, open, close } = useModal();

    const setAppLanguage = (selectedLanguage) => {
        i18n.changeLanguage(selectedLanguage); 
        setLanguage(selectedLanguage); 
        localStorage.setItem('lang', selectedLanguage);
        close();
    };

    const languagesBackend = async () => {
        try {
            const response = await get({ url: '/languages' });
            return Object.keys(response.data) || [];           
        } catch (error) {
            console.error('Error al cargar los idiomas del backend:', error);
            return [];
        }
    }

    useEffect(() => {
        
        open();

        const init = async () => {
            const backLangs = await languagesBackend();
            const frontLangs = Object.keys(i18n.options.resources);
            const availableLangs = frontLangs.filter((lang) => backLangs.includes(lang));
            setLanguages(availableLangs);
    
            const selectedLanguage = localStorage.getItem('lang') || navigator.language.split('-')[0];

            setAppLanguage(availableLangs.includes(selectedLanguage) ? selectedLanguage : i18n.options.lng);
        }

        init();

    }, []);

    if(isOpen) return <Loading isOpen={isOpen} />;

    const value = {
        language,
        languages,
        changeLanguage: setAppLanguage,
    }

    return(
        <LanguageContext.Provider value={ value } >
            { children }
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if(!context){
        throw new Error("useLanguage debe estar dentro del proveedor LanguageProvider");
    }

    return context;
}