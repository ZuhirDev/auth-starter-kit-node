import mongoose from 'mongoose';
import CONFIG from '#config/config.js';
import rolePermissionSeeder from '#db/seeders/rolePermissionSeeder.js';
import userSeeder from '#db/seeders/userSeeder.js';
import configSeeder from '#db/seeders/configSeeder.js';

const runSeeders = async () => {
    try {
        await mongoose.connect(CONFIG.MONGO_URL);
        console.log('🟢 Conectado a la base de datos');

        await rolePermissionSeeder();
        await userSeeder();
        await configSeeder();

        console.log('✅ Todos los seeders se ejecutaron correctamente.');
    } catch (error) {
        console.error('❌ Error al ejecutar los seeders:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔴 Desconectado de la base de datos');
        process.exit(0);
    }
};

runSeeders();
