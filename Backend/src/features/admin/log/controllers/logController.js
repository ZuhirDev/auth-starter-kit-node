import { Datatable } from "#helpers/datatable.js";
import { getLogsService, loggerService } from "#admin/log/services/auditLogService.js";

export const logger = async ({
    user_id = null,
    module = "other",
    action = '',
    target_id = null,
    status = 'success',
    ip_address = 'unknown',
}) => {

    try {
        const log = await loggerService(
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
        console.log("Error", error);
    }
}

export const logsDatatable = async (req, res) => {
    try {
        const logs = await getLogsService();

        const datatable = new Datatable(logs, req.query);
        const response = await datatable.toJson();

        return res.status(200).json({ 
            message: 'Logs retrieved successfully', 
            data: response.data,
            totalCount: response.totalCount,
        });
    } catch (error) {
        console.log("Error", error);
    }
}