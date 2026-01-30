

export class PermissionInterface {
    findById = async (id) => {
        throw new Error('Method "findById" must be implemented');
    };

    updateById = async (id, data) => {
        throw new Error('Method "updateById" must be implemented');
    };

    create = async (data) => {
        throw new Error('Method "create" must be implemented');
    };

    getAll = async () => {
        throw new Error('Method "getAll" must be implemented');
    };

    deleteById = async (id) => {
        throw new Error('Method "deleteById" must be implemented');
    };
}