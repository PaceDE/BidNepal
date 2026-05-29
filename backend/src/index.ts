import app from '@/app.js';
import dotenv from 'dotenv';
import { createServer } from 'http';
import '@/worker/emailWorker.js'

dotenv.config();
const PORT = process.env.PORT || 3000;

// Create server instance to attach socket later.
const server = createServer(app);

server.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
})
