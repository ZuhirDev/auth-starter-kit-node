import esFlag from '@/assets/flags/es.svg';
import enFlag from '@/assets/flags/gb.svg';

import enAuth from './locales/en/auth.json';
import enCommon from './locales/en/common.json';
import enConfig from './locales/en/config.json';
import enLog from './locales/en/log.json';
import enNavbar from './locales/en/navbar.json';
import enPermission from './locales/en/permission.json';
import enRole from './locales/en/role.json';
import enUser from './locales/en/user.json';
import enValidation from './locales/en/validation.json';


import esAuth from './locales/es/auth.json';
import esCommon from './locales/es/common.json';
import esConfig from './locales/es/config.json';
import esLog from './locales/es/log.json';
import esNavbar from './locales/es/navbar.json';
import esPermission from './locales/es/permission.json';
import esRole from './locales/es/role.json';
import esUser from './locales/es/user.json';
import esValidation from './locales/es/validation.json';

export const resources = {
  en: {
    auth: enAuth,
    common: enCommon,
    config: enConfig,
    log: enLog,
    navbar: enNavbar,
    permission: enPermission,
    role: enRole,
    user: enUser,
    validation: enValidation,
  },

  es: {
    auth: esAuth,
    common: esCommon,
    config: esConfig,
    log: esLog,
    navbar: esNavbar,
    permission: esPermission,
    role: esRole,
    user: esUser,
    validation: esValidation,
  },
};

export const languageConfig = {
  en: { label: 'English', icon: enFlag },
  es: { label: 'Español', icon: esFlag },
};
