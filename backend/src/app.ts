import express from 'express';

import cors from 'cors';

const app = express();
app.use(cors());
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

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default app;
