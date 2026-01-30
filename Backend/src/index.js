import { createApp } from './app.js';
import { Container } from './container.js';
import CONFIG from '#config/config.js';
import mongoose from 'mongoose';

const dbEngine = CONFIG.DATABASE_ENGINE;
const container = new Container(dbEngine);
const repositories = container.getRepositories();

const { app, server, dispatch: appDispatch } = createApp({ repositories });
export let dispatch = appDispatch;

switch (dbEngine) {
  case 'mongo':
    await mongoose.connect(CONFIG.MONGO_URL);
    console.log('✅ MongoDB connected');
    break;

  case 'mysql':
    throw new Error('MySQL support not implemented yet');
    // console.log('✅ MySQL connected');
    break;

  default:
    throw new Error(`Unsupported DATABASE_ENGINE: ${dbEngine}`);
}

server.listen(CONFIG.PORT, () => {
  console.log(`Server running on http://localhost:${CONFIG.PORT}`);
});
