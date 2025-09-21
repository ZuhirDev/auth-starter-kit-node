import { addPermissionToRoleService, createRoleService, deleteRoleService, getAllRolesService, getRoleByIdService, removePermissionFromRoleService } from "#rbac/service/roleService.js";
import { validateRequest } from "#utils/validation.js";
import { addPermissionToRoleSchema, createRoleSchema, getRoleByIdSchema, removePermissionFromRoleSchema } from "#rbac/validations/roleValidation.js";

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

export const getAllRoles = async (req, res) =>  {
    try {
        const roles = await getAllRolesService();

        res.status(200).json({ message: 'Roles retrieved successfully', data: roles });
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

        const { id, permissionId } = validation.data;

        const role = await getRoleByIdService(id);
        if(!role) return res.status(404).json({ message: 'Role not found' });

        const roleUpdated = await addPermissionToRoleService(role, permissionId);
        if(!roleUpdated) return res.status(400).json({ message: 'Permission already exists in role' });

        res.status(200).json({ message: 'Permission added to role successfully', data: roleUpdated });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const removePermissionFromRole = async (req, res) =>  {
    try {
        const validation = await validateRequest(removePermissionFromRoleSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, permissionId } = validation.data;

        const role = await getRoleByIdService(id);
        if(!role) return res.status(404).json({ message: 'Role not found' });

        const removedRole = await removePermissionFromRoleService(role, permissionId);
        if(!removedRole) return res.status(400).json({ message: 'Permission not found in role' });

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