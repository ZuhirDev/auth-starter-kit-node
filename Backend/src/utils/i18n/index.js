import i18n from "i18next";
import { resources } from "./languageConfig.js";
import { als } from "#auth/middleware/languageMiddleware.js";

i18n.init({
    resources,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
}, (err, t) => {
    if (err) return console.error('i18n error', err);
});

export default i18n;

export const supportedLanguages = [
  'en', // 'English' 
  'es', // 'Español' 
  'de', // 'Deutsch' 
];

export const t = (key, options) => {
    const store = als.getStore();
    const lang = store?.lang || i18n.options.fallbackLng;

    return i18n.cloneInstance({ lng: lang }).t(key, options);
};