import { Datatable } from "#helpers/datatable.js";
import { validateRequest } from "#utils/validation.js";
import { updateConfigSchema } from "#admin/config/validations/configValidation.js";
import { t } from "#utils/i18n/index.js";

export class ConfigController {

    constructor({ configService }){
        this.configService = configService;
    }

    getAll = async (req, res) => {
        try {
            const config = await this.configService.getAll();

            res.status(200).json({ 
                message: t('config:configurationsRetrievedSuccessfully'), 
                data: config,
            });
        } catch (error) {
            return res.status(500).json({ message: t('config:errorGettingAllConfigs') });
        }
    }

    getAllPublic = async (req, res) => {
        try {
            const config = req.user 
                ? await this.configService.getAll()
                : await this.configService.getAllPublic();

            res.status(200).json({ 
                message: t('config:configurationsRetrievedSuccessfully'), 
                data: config,
            });
        } catch (error) {
            return res.status(500).json({ message: t('config:errorGettingPublicConfigs') });
        }
    }

    datatable = async (req, res) => {
        try {
            const config = await this.configService.getAll();

            const datatable = new Datatable(config, req.query);
            const response = await datatable.toJson();

            return res.status(200).json({ 
                message: t('config:configurationsRetrievedSuccessfully'), 
                data: response.data,
                totalCount: response.totalCount,
            });
        } catch (error) {
            console.log("Error:", error);
            return res.status(500).json({ message: t('config:errorGettingDatatableConfigs') });
        }
    }

    update = async (req, res) => {
        try {
            const validation = await validateRequest(updateConfigSchema, req.body);
            if(!validation.success) return res.status(400).json({ errors: validation.errors });

            const { id, value, description, isPublic } = validation.data;

            const updatedConfig = await this.configService.update(id, { value, description, isPublic });
            if(!updatedConfig) return res.status(400).json({ message: t('config:errorUpdatingConfiguration') });

            res.status(201).json({ message: t('config:configurationUpdatedSuccessfully'), data: updatedConfig });
        } catch (error) {
            return res.status(500).json({ message: t('config:errorUpdatingConfiguration') });
        }
    }    

}