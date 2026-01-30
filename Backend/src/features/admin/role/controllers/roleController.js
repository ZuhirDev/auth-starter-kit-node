import { addPermissionsToRoleService, createRoleService, deleteRoleService, getAllRolesService, getRoleByIdService, removePermissionsFromRoleService, updateRoleService } from "#admin/role/service/roleService.js";
import { validateRequest } from "#utils/validation.js";
import { addPermissionToRoleSchema, createRoleSchema, getRoleByIdSchema, removePermissionFromRoleSchema, updateRoleSchema } from "#admin/role/validations/roleValidation.js";
import { Datatable } from "#helpers/datatable.js";
import { t } from "#utils/i18n/index.js";

export const createRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(createRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { name, description, permissions } = validation.data;

        const newRole = await createRoleService(name, description, permissions);
        if(!newRole) return res.status(400).json({ message: t("role:roleCreateError") });

        res.status(201).json({ message: t("role:roleCreated"), data: newRole });
    } catch (error) {
        return res.status(500).json({ message: t("role:roleCreateError") });
    }
}

export const updateRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(updateRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, name, description, permissions } = validation.data;

        const updatedRole = await updateRoleService(id, { name, description, permissions });
        if(!updatedRole) return res.status(400).json({ message: t("role:roleUpdateError") });

        res.status(200).json({ message: t("role:roleUpdated"), data: updatedRole });
    } catch (error) {
        return res.status(500).json({ message: t("role:roleUpdateError") });
    }
}

export const getAllRoles = async (req, res) =>  {
    try {
        const roles = await getAllRolesService();
        res.status(200).json({ message: t("role:rolesRetrieved"), data: roles });
    } catch (error) {
        return res.status(500).json({ message: t("role:rolesGetError") });
    }
}

export const allRolesDatatable = async (req, res) =>  {
    try {
        const roles = await getAllRolesService();
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

export const getRoleById = async (req, res) =>  {
    try {
        const validation = await validateRequest(getRoleByIdSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id } = validation.data;

        const role = await getRoleByIdService(id);
        if(!role) return res.status(404).json({ message: t("role:roleNotFound") });

        res.status(200).json({ message: t("role:roleRetrieved"), data: role });
    } catch (error) {
        return res.status(500).json({ message: t("role:rolesGetError") });
    }
}

export const addPermissionToRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(addPermissionToRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, permissionIds } = validation.data;

        const role = await getRoleByIdService(id);
        if(!role) return res.status(404).json({ message: t("role:roleNotFound") });

        const roleUpdated = await addPermissionsToRoleService(role, permissionIds);
        if(!roleUpdated) return res.status(400).json({ message: t("role:permissionsAddError") });

        res.status(200).json({ message: t("role:permissionsAdded"), data: roleUpdated });
    } catch (error) {
        return res.status(500).json({ message: t("role:permissionsAddFail") });
    }
}

export const removePermissionFromRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(removePermissionFromRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, permissionIds } = validation.data;

        const role = await getRoleByIdService(id);
        if(!role) return res.status(404).json({ message: t("role:roleNotFound") });

        const removedRole = await removePermissionsFromRoleService(role, permissionIds);
        if(!removedRole) return res.status(400).json({ message: t("role:permissionsRemoveError") });

        res.status(200).json({ message: t("role:permissionsRemoved"), data: removedRole });
    } catch (error) {
        return res.status(500).json({ message: t("role:permissionsRemoveFail") });
    }
}

export const deleteRole = async (req, res) => {
    try {
        const deletedRole = await deleteRoleService(req.params.id);
        if(!deletedRole) return res.status(404).json({ message: t("role:roleNotFound") });

        res.status(200).json({ message: t("role:roleDeleted"), data: deletedRole });
    } catch (error) {
        return res.status(500).json({ message: t("role:roleDeleteError") });
    }
}