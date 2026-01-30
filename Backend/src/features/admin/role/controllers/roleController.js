import { validateRequest } from "#utils/validation.js";
import { addPermissionToRoleSchema, createRoleSchema, getRoleByIdSchema, removePermissionFromRoleSchema, updateRoleSchema } from "#admin/role/validations/roleValidation.js";
import { Datatable } from "#helpers/datatable.js";
import { t } from "#utils/i18n/index.js";

export class RoleController {
    constructor({ roleService }) {
        this.roleService = roleService;
    }

    create = async (req, res) => {
        try {
            const validation = await validateRequest(createRoleSchema, req.body);
            if (!validation.success) return res.status(400).json({ errors: validation.errors });

            const { name, description, permissions } = validation.data;

            const newRole = await this.roleService.create({ name, description, permissions });
            if (!newRole) return res.status(400).json({ message: t("role:roleCreateError") });

            res.status(201).json({ message: t("role:roleCreated"), data: newRole });
        } catch (error) {
            return res.status(500).json({ message: t("role:roleCreateError") });
        }
    }

    getAll = async (req, res) => {
        try {
            const roles = await this.roleService.getAll();
            res.status(200).json({ message: t("role:rolesRetrieved"), data: roles });
        } catch (error) {
            return res.status(500).json({ message: t("role:rolesGetError") });
        }
    }

    datatable = async (req, res) => {
        try {
            const roles = await this.roleService.getAll();
            const datatable = new Datatable(roles, req.query);
            const data = await datatable.toJson();

            res.status(200).json({ 
                message: t("role:rolesRetrieved"), 
                data: data.data,
                totalCount: data.totalCount
            });
        } catch (error) {
            return res.status(500).json({ message: t("role:rolesDatatableError") });
        }
    }

    getById = async (req, res) => {
        try {
            const validation = await validateRequest(getRoleByIdSchema, req.params);
            if (!validation.success) return res.status(400).json({ errors: validation.errors });

            const { id } = validation.data;
            const role = await this.roleService.findById(id);
            if (!role) return res.status(404).json({ message: t("role:roleNotFound") });

            res.status(200).json({ message: t("role:roleRetrieved"), data: role });
        } catch (error) {
            return res.status(500).json({ message: t("role:rolesGetError") });
        }
    }

    update = async (req, res) => {
        try {
            const validation = await validateRequest(updateRoleSchema, req.body);
            if (!validation.success) return res.status(400).json({ errors: validation.errors });

            const { id, name, description, permissions } = validation.data;
            const updatedRole = await this.roleService.updateById(id, { name, description, permissions });
            if (!updatedRole) return res.status(404).json({ message: t("role:roleUpdateError") });

            res.status(200).json({ message: t("role:roleUpdated"), data: updatedRole });
        } catch (error) {
            return res.status(500).json({ message: t("role:roleUpdateError") });
        }
    }

    addPermissions = async (req, res) => {
        try {
            const validation = await validateRequest(addPermissionToRoleSchema, req.body);
            if (!validation.success) return res.status(400).json({ errors: validation.errors });

            const { id, permissionIds } = validation.data;
            const roleUpdated = await this.roleService.addPermissionsToRole(id, permissionIds);
            if (!roleUpdated) return res.status(400).json({ message: t("role:permissionsAddError") });

            res.status(200).json({ message: t("role:permissionsAdded"), data: roleUpdated });
        } catch (error) {
            return res.status(500).json({ message: t("role:permissionsAddFail") });
        }
    }

    removePermissions = async (req, res) => {
        try {
            const validation = await validateRequest(removePermissionFromRoleSchema, req.body);
            if (!validation.success) return res.status(400).json({ errors: validation.errors });

            const { id, permissionIds } = validation.data;
            const roleUpdated = await this.roleService.removePermissionsFromRole(id, permissionIds);
            if (!roleUpdated) return res.status(400).json({ message: t("role:permissionsRemoveError") });

            res.status(200).json({ message: t("role:permissionsRemoved"), data: roleUpdated });
        } catch (error) {
            return res.status(500).json({ message: t("role:permissionsRemoveFail") });
        }
    }

    delete = async (req, res) => {
        try {
            const deletedRole = await this.roleService.deleteById(req.params.id);
            if (!deletedRole) return res.status(404).json({ message: t("role:roleNotFound") });

            res.status(200).json({ message: t("role:roleDeleted"), data: deletedRole });
        } catch (error) {
            return res.status(500).json({ message: t("role:roleDeleteError") });
        }
    }
}