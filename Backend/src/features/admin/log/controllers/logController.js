import { Datatable } from "#helpers/datatable.js";

export class LogController{

    constructor({ logService }){
        this.logService = logService;
    }

    logger = async ({
        user_id = null,
        module = "other",
        action = '',
        target_id = null,
        status = 'success',
        ip_address = 'unknown',
    }) => {
        try {
            const log = await this.logService.logger(
                {
                    user_id,
                    module,
                    action,
                    target_id,
                    status,
                    ip_address,
                }            
            );
            
            return log;
        } catch (error) {
            console.log("Error:", error);
        }
    }

    datatable = async (req, res) => {
        try {
            const logs = await this.logService.getAll();
    
            const datatable = new Datatable(logs, req.query);
            const response = await datatable.toJson();
    
            return res.status(200).json({ 
                message: 'Logs retrieved successfully', 
                data: response.data,
                totalCount: response.totalCount,
            });
        } catch (error) {
            console.log("Error:", error);
        }
    }
}


