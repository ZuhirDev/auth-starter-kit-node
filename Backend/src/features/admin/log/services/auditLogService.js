import AuditLog from "#admin/log/models/auditLog.js"

export const loggerService = async ({
    user_id,
    module,
    action,
    target_id,
    status,
    ip_address,
}) => {

    const log = new AuditLog({
        user_id,
        module,
        action,
        target_id,
        status,
        ip_address,
    });

    await log.save();

    return log;
}

export const getLogsService = async () => {
    return await AuditLog.find();
}