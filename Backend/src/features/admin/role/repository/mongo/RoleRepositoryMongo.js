import { RoleInterface } from '#admin/role/repository/RoleInterface.js'
import Role from '#admin/role/repository/mongo/Role.js'

class RoleRepositoryMongo extends RoleInterface {

  findById = async (id) => {
    return await Role.findById(id)
  }

  getAll = async () => {
    return await Role.find()
  }

  create = async (data) => {
    const role = new Role(data)
    return await role.save()
  }

  updateById = async (id, data) => {
    return await Role.findByIdAndUpdate(id, data, { new: true })
  }

  deleteById = async (id) => {
    return await Role.findByIdAndDelete(id)
  }
}

export default RoleRepositoryMongo
