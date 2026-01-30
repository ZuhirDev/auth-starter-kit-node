import ConfigRepositoryMongo from "#admin/config/repository/mongo/ConfigRepositoryMongo.js";
import UserRepositoryMongo from "#user/repository/mongo/UserRepositoryMongo.js";
import LogRepositoryMongo from "#admin/log/repository/mongo/LogRepositoryMongo.js";
import PermissionRepositoryMongo from "#admin/permission/repository/mongo/PermissionRepositoryMongo.js";
import RoleRepositoryMongo from "#admin/role/repository/mongo/RoleRepositoryMongo.js";

export class Container {

    constructor(dbType){
        this.dbType = dbType;
        this.setupRepositories();
    }

    setupRepositories() {
        switch (this.dbType) {
        case 'mongo':
            this.configRepository = new ConfigRepositoryMongo();
            this.userRepository = new UserRepositoryMongo();
            this.userRepository = new UserRepositoryMongo();
            this.logRepository = new LogRepositoryMongo();
            this.permissionRepository = new PermissionRepositoryMongo();
            this.roleRepository = new RoleRepositoryMongo();
            break;
        case 'mysql':
            // this.configRepository = new MySQLConfigRepository();
            break;
        default:
            throw new Error(`Unsupported DB type: ${this.dbType}`);
        }
    }

    getRepositories() {
        return {
            configRepository: this.configRepository,
            userRepository: this.userRepository,
            logRepository: this.logRepository,
            permissionRepository: this.permissionRepository,
            roleRepository: this.roleRepository,
        };
    }
}