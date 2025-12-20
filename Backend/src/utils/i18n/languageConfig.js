
import enAuth from './locales/en/auth.json' with { type: 'json' };
import enConfig from './locales/en/config.json' with { type: 'json' };
import enPermission from './locales/en/permission.json' with { type: 'json' };
import enRole from './locales/en/role.json' with { type: 'json' };
import enUser from './locales/en/user.json' with { type: 'json' };
import enValidation from './locales/en/validation.json' with { type: 'json' };

import esAuth from './locales/es/auth.json' with { type: 'json' };
import esConfig from './locales/es/config.json' with { type: 'json' };
import esPermission from './locales/es/permission.json' with { type: 'json' };
import esRole from './locales/es/role.json' with { type: 'json' };
import esUser from './locales/es/user.json' with { type: 'json' };
import esValidation from './locales/es/validation.json' with { type: 'json' };

export const resources = {
  en: { 
    auth: enAuth,
    config: enConfig,
    permission: enPermission,
    role: enRole,
    user: enUser,
    validation: enValidation,
  },

  es: { 
    auth: esAuth,
    config: esConfig,
    permission: esPermission,
    role: esRole,
    user: esUser,
    validation: esValidation,
  },
};
