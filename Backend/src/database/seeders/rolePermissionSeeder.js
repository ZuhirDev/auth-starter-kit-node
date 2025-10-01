import Permission from '#admin/permission/models/permission.js';
import Role from '#admin/role/models/role.js';

const permissionsData = [
  { name: 'create', resource: 'manage_permissions', description: '' },
  { name: 'read', resource: 'manage_permissions', description: '' },
  { name: 'update', resource: 'manage_permissions', description: '' },
  { name: 'delete', resource: 'manage_permissions', description: '' },

  { name: 'create', resource: 'manage_roles', description: '' },
  { name: 'read', resource: 'manage_roles', description: '' },
  { name: 'update', resource: 'manage_roles', description: '' },
  { name: 'delete', resource: 'manage_roles', description: '' },
];

const rolePermissionSeeder = async () => {
  try {

    await Permission.deleteMany({});
    await Role.deleteMany({});

    const createdPermissions = await Permission.insertMany(permissionsData);
    console.log(`✅Created ${createdPermissions.length} permissions.`);

    const permissionIds = createdPermissions.map(p => p._id);

    const role = new Role({
      name: 'role_permission_manager',
      description: 'Rol encargado de la gestión completa de roles y permisos.',
      permissions: permissionIds,
    });

    await role.save();

    console.log('✅ Role created successfully');

  } catch (error) {
    console.error('Seeder failed:', error);
    throw error;
  }
};

export default rolePermissionSeeder;
