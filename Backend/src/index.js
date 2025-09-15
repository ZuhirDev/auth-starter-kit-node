import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import CONFIG from '#config/config.js';
import router from '#routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

mongoose.connect(CONFIG.MONGO_URL)
    .then(() => {
        app.listen(CONFIG.PORT, () => {
            console.log(`Servidor funcionando en http://localhost:${CONFIG.PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error conectando a MongoDB: ", err);
    });