import { addPermissionsToRoleService, createRoleService, deleteRoleService, getAllRolesService, getRoleByIdService, removePermissionsFromRoleService, updateRoleService } from "#admin/role/service/roleService.js";
import { validateRequest } from "#utils/validation.js";
import { addPermissionToRoleSchema, createRoleSchema, getRoleByIdSchema, removePermissionFromRoleSchema, updateRoleSchema } from "#admin/role/validations/roleValidation.js";
import { Datatable } from "#helpers/datatable.js";
import id from "zod/v4/locales/id.cjs";

export const createRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(createRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { name, description, permissions } = validation.data;

        const newRole = await createRoleService(name, description, permissions);
        if(!newRole) return res.status(400).json({ message: 'Error creating Role' });

        res.status(201).json({ message: 'Role created successfully', data: newRole });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const updateRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(updateRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, name, description, permissions } = validation.data;

        const newRole = await updateRoleService(id, {name, description, permissions});
        if(!newRole) return res.status(400).json({ message: 'Error creating Role' });

        res.status(201).json({ message: 'Role updated successfully', data: newRole });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const getAllRoles = async (req, res) =>  {
    try {
        const roles = await getAllRolesService();

        res.status(200).json({ message: 'Roles retrieved successfully', data: roles });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const allRolesDatatable = async (req, res) =>  {
    try {
        const roles = await getAllRolesService();
        const datatable = new Datatable(roles, req.query);
        const data = await datatable.toJson();

        res.status(200).json({ 
            message: 'Roles retrieved successfully', 
            data: data.data,
            totalCount: data.totalCount
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const getRoleById = async (req, res) =>  {
    try {
        const validation = await validateRequest(getRoleByIdSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id } = validation.data;

        const role = await getRoleByIdService(id);
        if(!role) return res.status(404).json({ message: 'Role not found' });

        res.status(200).json({ message: 'Role retrieved successfully', data: role });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const addPermissionToRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(addPermissionToRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, permissionIds } = validation.data;

        const role = await getRoleByIdService(id);
        if(!role) return res.status(404).json({ message: 'Role not found' });

        const roleUpdated = await addPermissionsToRoleService(role, permissionIds);
        if(!roleUpdated) return res.status(400).json({ message: 'No permissions were added' });

        res.status(200).json({ message: 'Permission added to role successfully', data: roleUpdated });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const removePermissionFromRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(removePermissionFromRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, permissionIds } = validation.data;

        const role = await getRoleByIdService(id);
        if(!role) return res.status(404).json({ message: 'Role not found' });

        const removedRole = await removePermissionsFromRoleService(role, permissionIds);
        if(!removedRole) return res.status(400).json({ message: 'No permissions were removed' });

        res.status(200).json({ message: 'Role removed successfully', data: removedRole });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const deleteRole = async (req, res) => {
    try {
        const deletedRole = await deleteRoleService(req.params.id);
        if(!deletedRole) return res.status(404).json({ message: 'Role not found' });

        res.status(200).json({ message: 'Role deleted successfully', data: deletedRole });
    } catch (error) {
        return res.status(500).json({ message:  error });
    }
}