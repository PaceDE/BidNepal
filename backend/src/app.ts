import express from 'express';
import cors from 'cors';
import { errorHandler } from '@/middleware/errorHandler.js';
import authRouter from "@/modules/auth/auth.routes.js";

const allowedOrigins= process.env.CLIENT_URL?.split(',') || [];
const app = express();
app.use(cors({
    origin: function(origin,callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null,true);
        } else {
            callback(new Error('The origin is not alloweds by CORS.'))
        }
    }
}));

app.use(express.json());

app.get("/", (_, res) => {
    res.status(200).json({ message: "Welcome to the BidNepal backend" });
});

app.get('/health', (_, res) => {
    res.status(200).json({
         status: "ok",
         uptime: process.uptime(),
        });
});

app.use('/api/auth',authRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
