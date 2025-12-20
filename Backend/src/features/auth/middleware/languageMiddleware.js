import { supportedLanguages } from "#utils/i18n/index.js";
import { AsyncLocalStorage } from "async_hooks";
import i18n from "#utils/i18n/index.js";

export const als = new AsyncLocalStorage();

export const langMiddleware = async (req, res, next) => {
    const acceptLang = req.headers['accept-language'];
    let lang;

    if(acceptLang && supportedLanguages.includes(acceptLang)){
        lang = acceptLang;
    }else {
        lang = i18n.options.fallbackLng
    }
    
    als.run({ lang }, () => next() );
}