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
    console.log(`La config "${key}" ya existe. Saltando...`);
    return;
  }

  const config = new Config({ key, value, description });
  await config.save();
  console.log(`✅ Config creada: ${key} = ${value}`);
}

const configSeeder = async () => {
  try {

    for (const config of configs) {
      await createConfig(config);
    }

    console.log('✅ Seeder de configs completado');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear configs:', error);
    process.exit(1);
  }
}

export default configSeeder;