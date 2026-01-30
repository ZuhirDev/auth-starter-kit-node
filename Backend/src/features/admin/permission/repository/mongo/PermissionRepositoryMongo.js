import { PermissionInterface } from '#admin/permission/repository/PermissionInterface.js'
import Permission from '#admin/permission/repository/mongo/Permission.js'

class PermissionRepositoryMongo extends PermissionInterface {

  findById = async (id) => {
    return await Permission.findById(id)
  }

  getAll = async () => {
    return await Permission.find()
  }

  create = async (data) => {
    const permission = new Permission(data)
    return await permission.save()
  }

  updateById = async (id, data) => {
    return await Permission.findByIdAndUpdate(id, data, { new: true })
  }

  deleteById = async (id) => {
    return await Permission.findByIdAndDelete(id)
  }
}

export default PermissionRepositoryMongo
