import mongoose from 'mongoose';
import CONFIG from '#config/config.js';
import rolePermissionSeeder from '#db/seeders/rolePermissionSeeder.js';
import userSeeder from '#db/seeders/userSeeder.js';
import configSeeder from '#db/seeders/configSeeder.js';

const runSeeders = async () => {
    try {
        await mongoose.connect(CONFIG.MONGO_URL);
        console.log('🟢 Connected to the database');

        await rolePermissionSeeder();
        await userSeeder();
        await configSeeder();

        console.log('✅ All seeders ran successfully.');
    } catch (error) {
        console.error('❌ Error running seeders:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔴 Disconnected from the database');
        process.exit(0);
    }
};

runSeeders();
