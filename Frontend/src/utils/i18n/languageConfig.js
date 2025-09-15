import esFlag from '@/assets/flags/es.svg';
import enFlag from '@/assets/flags/gb.svg';

import enValidation from './locales/en/validation.json';
import enAuth from './locales/en/auth.json';
import enNavbar from './locales/en/navbar.json';
import enUser from '@/utils/i18n/locales/en/user.json';

import esValidation from './locales/es/validation.json';
import esAuth from './locales/es/auth.json';
import esNavbar from './locales/es/navbar.json';
import esUser from '@/utils/i18n/locales/es/user.json';

export const resources = {
  en: { 
    validation: enValidation, 
    auth: enAuth,
    navbar: enNavbar,
    user: enUser,
  },

  es: { 
    validation: esValidation, 
    auth: esAuth,
    navbar: esNavbar,
    user: esUser,
  },
};

export const languageConfig = {
    en: { label: 'English', icon: enFlag },
    es: { label: 'Español', icon: esFlag },
};
