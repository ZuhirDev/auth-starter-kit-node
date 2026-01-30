import { UserService } from "#user/services/userService.js";
import { UserAdminController } from "#admin/user/controllers/userAdminController.js";
import { UserPermissionController } from "#admin/user/controllers/userPermissionController.js";
import { UserRoleController } from "#admin/user/controllers/userRoleController.js";
import adminUserRouter from "#admin/user/routes/adminUserRouter.js";
import { UserPermissionService } from "#admin/user/services/userPermissionService.js";
import { UserRoleService } from "#admin/user/services/userRoleService.js";
import { LogService } from "#admin/log/services/logService.js";

export const createUserAdminModule = ({ userRepository, logRepository }) => {

    const userService = new UserService({ userRepository });
    const logService = new LogService({ logRepository });
    
    const userPermissionService = new UserPermissionService({ userRepository });
    const userPermissionController = new UserPermissionController({ userService, userPermissionService, logService});
    
    const userRoleService = new UserRoleService({ userRepository });
    const userRoleController = new UserRoleController({ userService, userRoleService, logService });

    const userAdminController = new UserAdminController({ userService });

    return adminUserRouter({ userPermissionController, userRoleController, userAdminController });
}