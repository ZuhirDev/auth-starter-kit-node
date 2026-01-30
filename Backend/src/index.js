import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import CONFIG from '#config/config.js';
import router from '#routes/index.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import { initSocket } from '#utils/socketService.js';
import '#utils/i18n/index.js';

const app = express();
const server = http.createServer(app);
export const dispatch = initSocket(server);

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

mongoose.connect(CONFIG.MONGO_URL)
    .then(() => {
        server.listen(CONFIG.PORT, () => {
            console.log(`Server running on http://localhost:${CONFIG.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Error conectando a MongoDB: ", err);
    });