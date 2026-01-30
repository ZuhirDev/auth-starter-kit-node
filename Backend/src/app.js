
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { initSocket } from '#utils/socketService.js';
import '#utils/i18n/index.js';
import mainRouter from './routes/index.js';
import { createAuthMiddleware } from '#auth/middleware/authMiddleware.js';

export const createApp = ({ repositories }) => {
    const app = express();
    const server = http.createServer(app);
    const dispatch = initSocket(server);
    
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }));
    
    const auth =  createAuthMiddleware({ userRepository: repositories.userRepository });
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api', mainRouter({ repositories }));

    return { app, server, dispatch };
}