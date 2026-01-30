import { UserController } from "#user/controllers/userController.js";
import userRouter from "#user/routes/userRouter.js";
import { UserService } from "#user/services/userService.js";

export const createUserModule = ({ userRepository }) => {
    const userService = new UserService({ userRepository });
    const userController = new UserController({ userService });

    return userRouter({ userController });
}