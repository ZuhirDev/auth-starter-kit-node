import { createPermissionService, deletePermissionService, getAllPermissionsService, getPermissionByIdService, updatePermissionService } from "#rbac/service/permissionService.js";
import { validateRequest } from "#utils/validation.js";
import { createPermissionSchema, deletePermissionSchema, getPermissionByIdSchema, updatePermissionSchema } from "#rbac/validations/permissionValidation.js";

export const createPermission = async (req, res) =>  {
    try {
        const validation = await validateRequest(createPermissionSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { name, resource, description } = validation.data;

        const newPermission = await createPermissionService(name, resource, description);
        if(!newPermission) return res.status(400).json({ message: 'Error creating permission' });

        res.status(201).json({ message: 'Permission created successfully', data: newPermission });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const getAllPermissions = async (req, res) =>  {
    try {
        const permissions = await getAllPermissionsService();

        res.status(200).json({ message: 'Permissions retrieved successfully', data: permissions });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const getPermissionById = async (req, res) =>  {
    try {
        const validation = await validateRequest(getPermissionByIdSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id } = validation.data;

        const permission = await getPermissionByIdService(id);
        if(!permission) return res.status(404).json({ message: 'Permission not found' });

        res.status(200).json({ message: 'Permission retrieved successfully', data: permission });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const updatePermission = async (req, res) =>  {
    try {
        const validation = await validateRequest(updatePermissionSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, name, resource, description } = validation.data;

        const updatedPermission = await updatePermissionService(id, { name, resource, description }) ;
        if(!updatedPermission) return res.status(404).json({ message: 'Permission not found' });

        res.status(200).json({ message: 'Permission updated successfully', data: updatedPermission });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const deletePermission = async (req, res) =>  {
    try {
        console.log(req.params)
        const validation = await validateRequest(deletePermissionSchema, req.params);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id } = validation.data;

        const permission = await deletePermissionService(id);
        if(!permission) return res.status(404).json({ message: 'Permission not found' });

        res.status(200).json({ message: 'Permission deleted successfully', data: permission });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}