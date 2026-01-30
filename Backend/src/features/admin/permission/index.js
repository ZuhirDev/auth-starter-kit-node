import permissionRouter from "#admin/permission/routes/permissionRouter.js";
import { PermissionService } from "#admin/permission/service/permissionService.js";
import { PermissionController } from "#admin/permission/controllers/permissionController.js";

export const createPermissionModule = ({ permissionRepository }) => {
    const permissionService = new PermissionService({ permissionRepository });
    const permissionController = new PermissionController({ permissionService });

    return permissionRouter({ permissionController });
}