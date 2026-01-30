import Config from "#admin/config/repository/mongo/Config.js";
import { ConfigRepositoryInterface } from "#admin/config/repository/ConfigRepositoryInterface.js";

class ConfigRepositoryMongo extends ConfigRepositoryInterface {

  getAll = async () => {
    return await Config.find();
  };

  getAllPublic = async () => {
    return await Config.find({ isPublic: true });
  };

  updateById = async (id, data) => {
    return await Config.findByIdAndUpdate(id, data, { new: true });
  };

}

export default ConfigRepositoryMongo;