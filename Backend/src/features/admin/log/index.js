import { LogController } from "#admin/log/controllers/logController.js";
import logRouter from "#admin/log/router/logRouter.js";
import { LogService } from "#admin/log/services/logService.js";

export const createLogModule = ({ logRepository }) => {

    const logService = new LogService({ logRepository });
    const logController = new LogController({ logService });

    return logRouter({ logController });
}