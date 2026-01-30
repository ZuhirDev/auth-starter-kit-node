export class LogService {

    constructor({ logRepository }){
        this.logRepository = logRepository;
    }

    logger = async ({
        user_id,
        module,
        action,
        target_id,
        status,
        ip_address,
    }) => {
    
        const log = await this.logRepository.create({
            user_id,
            module,
            action,
            target_id,
            status,
            ip_address,
        });
    
        return log;
    }
    
    getAll = async () => {
        return await this.logRepository.getAll();
    }
}