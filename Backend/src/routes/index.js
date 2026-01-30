import express from 'express';
import { TwoFA } from '#auth/middleware/2faMiddleware.js';
import permissionRouter from '#admin/permission/routes/permissionRouter.js';
import adminUserRouter from '#admin/user/routes/adminUserRouter.js';
import { notification } from '#admin/notification/controllers/notificationController.js';
import { langMiddleware } from '#auth/middleware/languageMiddleware.js';
import { supportedLanguages } from '#utils/i18n/index.js';
import { createConfigModule } from '#admin/config/index.js';
import { createUserModule } from '#user/index.js';
import { createAuthModule } from '#auth/index.js';
import { createLogModule } from '#admin/log/index.js';
import { createPermissionModule } from '#admin/permission/index.js';
import { createRoleModule } from '#admin/role/index.js';
import { createUserAdminModule } from '#admin/user/index.js';

const mainRouter = async ({ repositories }) => {

    const router = express.Router();
    
    router.use(langMiddleware);
    router.use('/languages', (req, res) => {
        res.json(supportedLanguages);
    });

    router.use('/config', createConfigModule({ configRepository: repositories.configRepository }));
    router.use('/', createUserModule({ userRepository: repositories.userRepository }));
    router.use('/', createAuthModule({ userRepository: repositories.userRepository, logRepository: repositories.logRepository }));
    router.use('/logs', createLogModule({ logRepository: repositories.logRepository }));
    router.use('/permissions', createPermissionModule({ permissionRepository: repositories.permissionRepository }));
    router.use('/roles', createRoleModule({ roleRepository: repositories.roleRepository }));
    router.use('/admin', createUserAdminModule({ userRepository: repositories.userRepository, logRepository: repositories.logRepository }));

    // pendiente de migrar el resto.  
    // las rutas de auth y 2fa reciben el mismo userrepository
    // HE AÑADIDO LOGREPOSITORY A AUTHCONTROLLER REVISAR FLUJO .
    // router.post('/notification', auth, TwoFA, notification);

    router.get('/', (req, res) => {
        res.json({ message: 'Hello from backend' });
    });
    
    router.use('/', (req, res) => {
        res.status(404).json({ message: 'Not found in Backend' });
    });

    return router;
}

export default mainRouter;