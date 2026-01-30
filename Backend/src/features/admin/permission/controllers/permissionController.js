import { validateRequest } from "#utils/validation.js";
import { createPermissionSchema, deletePermissionSchema, getPermissionByIdSchema, updatePermissionSchema } from "#admin/permission/validations/permissionValidation.js";
import { Datatable } from "#helpers/datatable.js";
import { t } from "#utils/i18n/index.js";

export class PermissionController {

    constructor({ permissionService }) {
        this.permissionService = permissionService;
    }

    create = async (req, res) => {
        try {
            const validation = await validateRequest(createPermissionSchema, req.body);
            if (!validation.success) {
                return res.status(400).json({ errors: validation.errors });
            }

            const { name, resource, description } = validation.data;

            const newPermission = await this.permissionService.create({
                name,
                resource,
                description,
            });

            if (!newPermission) {
                return res.status(400).json({
                    message: t('permission:failedToCreatePermission')
                });
            }

            res.status(201).json({
                message: t('permission:permissionCreatedSuccessfully'),
                data: newPermission
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    getAll = async (req, res) => {
        try {
            const permissions = await this.permissionService.getAll();

            res.status(200).json({
                message: t('permission:permissionsRetrievedSuccessfully'),
                data: permissions
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    datatable = async (req, res) => {
        try {
            const permissions = await this.permissionService.getAll();
            const datatable = new Datatable(permissions, req.query);
            const data = await datatable.toJson();

            res.status(200).json({
                message: t('permission:permissionsRetrievedSuccessfully'),
                data: data.data,
                totalCount: data.totalCount
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    findById = async (req, res) => {
        try {
            const validation = await validateRequest(getPermissionByIdSchema, req.params);
            if (!validation.success) {
                return res.status(400).json({ errors: validation.errors });
            }

            const { id } = validation.data;

            const permission = await this.permissionService.findById(id);
            if (!permission) {
                return res.status(404).json({
                    message: t('permission:permissionNotFound')
                });
            }

            res.status(200).json({
                message: t('permission:permissionRetrievedSuccessfully'),
                data: permission
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    update = async (req, res) => {
        try {
            const validation = await validateRequest(updatePermissionSchema, req.body);
            if (!validation.success) {
                return res.status(400).json({ errors: validation.errors });
            }

            const { id, name, resource, description } = validation.data;

            const updatedPermission = await this.permissionService.updateById(
                id,
                { name, resource, description }
            );

            if (!updatedPermission) {
                return res.status(404).json({
                    message: t('permission:permissionNotFound')
                });
            }

            res.status(200).json({
                message: t('permission:permissionUpdatedSuccessfully'),
                data: updatedPermission
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };

    delete = async (req, res) => {
        try {
            const validation = await validateRequest(deletePermissionSchema, req.params);
            if (!validation.success) {
                return res.status(400).json({ errors: validation.errors });
            }

            const { id } = validation.data;

            const permission = await this.permissionService.deleteById(id);
            if (!permission) {
                return res.status(404).json({
                    message: t('permission:permissionNotFound')
                });
            }

            res.status(200).json({
                message: t('permission:permissionDeletedSuccessfully'),
                data: permission
            });
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    };
}
