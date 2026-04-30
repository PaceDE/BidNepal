import app from '@/app.js';
import { createServer } from 'http';

const PORT = process.env.PORT || 3000;

// Create server instance to attack socket later.
const server = createServer(app);

server.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
})