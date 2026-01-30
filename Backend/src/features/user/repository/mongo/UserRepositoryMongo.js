import { UserInterface } from "#user/repository/UserInterface.js";
import User from "#user/repository/mongo/User.js";

class UserRepositoryMongo extends UserInterface {

  findByEmail = async (email) => {
    return await User.findOne({ email });
  }

  findById = async (id) => {
    return await User.findById(id);
  }

  getAll = async () => {
    return await User.find().populate('permissions').populate('roles');
  }

  create = async (data) => {
    const user = new User(data);
    return await user.save();
  }

  updateById = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }

  deleteById = async (id) => {
    return await User.findByIdAndDelete(id);
  }

  // ---------------- Permisos ----------------

  assignPermissions = async (userId, permissionIds = []) => {
    const user = await User.findById(userId).populate('permissions');
    if (!user) return null;

    const existingIds = user.permissions.map(p => p.id.toString());
    const newIds = permissionIds.filter(id => !existingIds.includes(id));
    if (!newIds.length) return user;

    user.permissions.push(...newIds);
    return await user.save();
  }

  removePermissions = async (userId, permissionIds = []) => {
    const user = await User.findById(userId).populate('permissions');
    if (!user) return null;

    user.permissions = user.permissions.filter(
      perm => !permissionIds.includes(perm.id.toString())
    );

    return await user.save();
  }

  getUserPermission = async (userId) => {
    const user = await User.findById(userId).populate('permissions');
    if (!user) return [];

    return user.permissions;
  }

  getUserPermissionIds = async (userId) => {
    const user = await User.findById(userId).populate('permissions');
    if (!user) return [];

    return user.permissions.map(p => p.id.toString());
  }

  getEffectivePermissions = async (userId) => {
    const user = await User.findById(userId)
      .populate('permissions')
      .populate({
        path: 'roles',
        populate: { path: 'permissions' }
      });

    if (!user) return [];

    const direct = user.permissions;
    const fromRoles = user.roles.flatMap(r => r.permissions);

    const effectiveMap = new Map();
    [...direct, ...fromRoles].forEach(perm => {
      effectiveMap.set(perm.id.toString(), perm);
    });

    return Array.from(effectiveMap.values());
  }

  // ROLES
  getUserRole = async (userId) => {
    const user = await User.findById(userId).populate('roles');
    if (!user) return [];

    return user.roles;
  }

  getUserRoleIds = async (userId) => {
    const user = await User.findById(userId).populate('roles');
    if (!user) return [];

    return user.roles.map(r => r.id.toString());
  }

  assignRoles = async (userId, roleIds = []) => {
    const user = await User.findById(userId).populate('roles');
    if (!user) return null;

    const existingIds = new Set(user.roles.map(r => r.id.toString()));
    const newIds = roleIds.filter(id => !existingIds.has(id));
    if (!newIds.length) return null;

    user.roles.push(...newIds);
    return await user.save();
  }

  removeRoles = async (userId, roleIds = []) => {
    const user = await User.findById(userId).populate('roles');
    if (!user) return null;

    const existingIds = new Set(user.roles.map(r => r.id.toString()));
    const idsToRemove = roleIds.filter(id => existingIds.has(id));

    if (!idsToRemove.length) return user;

    user.roles = user.roles.filter(role => !idsToRemove.includes(role.id.toString()));
    return await user.save();
  }
  
}

export default UserRepositoryMongo;
