
export class PermissionService {

    constructor({ permissionRepository }){
        this.permissionRepository = permissionRepository;
    }

    create = async ({ name, resource, description }) => {
        return this.permissionRepository.create({
            name,
            resource,
            description,
        });
    };

    getAll = async () => {
        return this.permissionRepository.getAll();
    };

    findById = async (id) => {
        return this.permissionRepository.findById(id);
    };

    updateById = async (id, data) => {
        return this.permissionRepository.updateById(id, data);
    };

    deleteById = async (id) => {
        return this.permissionRepository.deleteById(id);
    };
}