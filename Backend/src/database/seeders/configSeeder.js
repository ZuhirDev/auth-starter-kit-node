import Config from "#admin/config/models/config.js";

const configs = [
  {
    key: 'enable_oauth_google',
    value: false,
    description: 'Enable login with Google OAuth',
    isPublic: true,
  }
];

const createConfig = async ({ key, value, description }) => {
  const existing = await Config.findOne({ key });
  if (existing) {
    console.log(`The config "${key}" already exists. Skipping...`);
    return;
  }

  const config = new Config({ key, value, description });
  await config.save();
  console.log(`✅ Config created: ${key} = ${value}`);
}

const configSeeder = async () => {
  try {

    for (const config of configs) {
      await createConfig(config);
    }

    console.log('✅ Config seeder completed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating configs:', error);
    process.exit(1);
  }
}

export default configSeeder;