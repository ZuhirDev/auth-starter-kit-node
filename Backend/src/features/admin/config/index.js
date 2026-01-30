import { ConfigController } from "./controllers/configController.js";
import configRouter from "./router/configRouter.js";
import { ConfigService } from "./service/configService.js";

export const createConfigModule = ({ configRepository }) => {

    const configService = new ConfigService({ configRepository });
    const configController = new ConfigController({ configService });

    return configRouter({ configController });
}