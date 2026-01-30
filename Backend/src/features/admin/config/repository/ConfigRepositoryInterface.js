

export class ConfigRepositoryInterface {
    async getAll() {
        throw new Error('Method "getAll" must be implemented');
    }

    async getAllPublic() {
        throw new Error('Method "getAllPublic" must be implemented');
    }

    async updateById(id, data) {
        throw new Error('Method "updateById" must be implemented');
    }
}