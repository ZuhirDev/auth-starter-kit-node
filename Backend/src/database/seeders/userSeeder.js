import bcrypt from 'bcryptjs';
import User from '#user/models/user.js';
import Role from '#admin/role/models/role.js';

const users = [
  { name: 'Administrador', email: 'admin@admin.es', password: '11111111' },
  { name: 'User', email: 'user@user.es', password: '11111111' },
];

const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`User with email ${email} already exists. Skipping...`);
    return;
  }

  const userData = {
    name,
    email,
    password: hashedPassword,
  }

  if (email === 'admin@admin.es') {
    const role = await Role.findOne({ name: 'role_permission_manager' });

    if (!role) {
      console.warn(`⚠️ Role 'role_permission_manager' not found. It will not be assigned to the admin.`);
    } else {
      userData.roles = [role.id];
    }
  }

  const user = new User(userData);
  await user.save();
  console.log(`✅ User created: ${name} (${email})`);
};

const userSeeder = async () => {
  try {

    for (const user of users) {
      await createUser(user);
    }

  } catch (error) {
    console.error('❌ Error creating users:', error);
    throw error;
  }
};

export default userSeeder;
