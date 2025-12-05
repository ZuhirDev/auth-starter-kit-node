import { getAllConfigPublicService, getAllConfigService, updateConfigService } from "#admin/config/service/configService.js";
import { Datatable } from "#helpers/datatable.js";
import { validateRequest } from "#utils/validation.js";
import { updateConfigSchema } from "#admin/config/validations/configValidation.js";

export const getAllConfig = async (req, res) =>  {
    try {
        console.log("User auth", req.user)
        const config = await getAllConfigService();

        res.status(200).json({ 
            message: 'Configs retrieved successfully', 
            data: config,
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const getAllConfigPublic = async (req, res) =>  {
    try {
        
        const config = req.user 
        ? await getAllConfigService()
        : await getAllConfigPublicService();

        res.status(200).json({ 
            message: 'Configs retrieved successfully', 
            data: config,
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

export const configDatatable = async (req, res) => {
    try {
        const config = await getAllConfigService();

        const datatable = new Datatable(config, req.query);
        const response = await datatable.toJson();

        return res.status(200).json({ 
            message: 'Config retrieved successfully', 
            data: response.data,
            totalCount: response.totalCount,
        });
    } catch (error) {
        console.log("Error", error);
    }
}

export const updateConfig = async (req, res) =>  {
    try {
        const validation = await validateRequest(updateConfigSchema, req.body);
        if(!validation.success) return res.status(400).json({ errors: validation.errors });

        const { id, value, description, isPublic } = validation.data;

        const updatedConfig = await updateConfigService(id, { value, description, isPublic });
        if(!updatedConfig) return res.status(400).json({ message: 'Error updating Config' });

        res.status(201).json({ message: 'Config updated successfully', data: updatedConfig });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}