import { LogInterface } from "#admin/log/repository/LogInterface.js";
import AuditLog from "#admin/log/repository/mongo/AuditLog.js";

class LogRepositoryMongo extends LogInterface {
    getAll = async () =>  {
        return await AuditLog.find()
    }

    create = async (data) => {
        const log = new AuditLog(data)
        return await log.save()
    }
}

export default LogRepositoryMongo;