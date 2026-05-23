import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { csrfMiddleware } from './modules/csrf/csrf.middleware.js';
import authRouter from "@/modules/auth/auth.routes.js";
import csrfRouter from "@/modules/csrf/csrf.routes.js";
import { errorHandler } from '@/middleware/errorHandler.js';

const allowedOrigins= process.env.CLIENT_URL?.split(',') || [];
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(cookieParser());

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

app.use('/api/csrf',csrfRouter);

app.use('/api/auth',authRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;
