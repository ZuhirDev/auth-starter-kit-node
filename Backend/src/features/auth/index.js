import { UserService } from "#user/services/userService.js";
import { TwoFAController } from "#auth/controllers/2faController.js";
import { AuthController } from "#auth/controllers/authController.js";
import { LogService } from "#admin/log/services/logService.js";
import authRouter from "#auth/routes/authRouter.js";
import { UserPermissionService } from "#admin/user/services/userPermissionService.js";

export const createAuthModule = ({ userRepository, logRepository }) => {
    const logService = new LogService({ logRepository });
    const userService = new UserService({ userRepository, logService });
    const userPermissionService = new UserPermissionService({ userRepository });
    const authController = new AuthController({ userService, logService, userPermissionService });
    const twoFAController = new TwoFAController({ userService, logService });

    return authRouter({ userService, authController, twoFAController });
}