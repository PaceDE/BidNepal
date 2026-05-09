import { Queue } from "bullmq";
import redis from "@/config/redis.js";

export const emailQueue = new Queue('emails',{
    connection:redis,
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:'fixed',
            delay:2000
        },
        removeOnComplete: true,
        removeOnFail:true
    }
})

emailQueue.on('error', (err) => {
    const code = (err as any)?.code;
    if (code !== 'ECONNREFUSED' && code !== 'ECONNABORTED') {
        console.error('Email queue unexpected error:', err.message);
    }
});
