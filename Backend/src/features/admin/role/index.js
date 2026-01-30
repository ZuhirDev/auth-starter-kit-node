import { RoleController } from "#admin/role/controllers/roleController.js";
import roleRouter from "#admin/role/routes/roleRouter.js";
import { RoleService } from "#admin/role/service/roleService.js";

export const createRoleModule = ({ roleRepository }) => {
    const roleService = new RoleService({ roleRepository });
    const roleController = new RoleController({ roleService });

    return roleRouter({ roleController });
}
