import Config from "#admin/config/models/config.js";

export const getAllConfigService = async () => {
  return await Config.find();
}

export const getAllConfigPublicService = async () => {
  return await Config.find({ isPublic: true});
}

export const updateConfigService = async (id, { value, description, isPublic }) => {
  const config = await Config.findByIdAndUpdate(id, { value, description, isPublic }, { new: true });
  if(!config) return null;

  return config;
}