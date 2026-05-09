import { Redis } from 'ioredis';

let isRedisDown = false;

const redis = new Redis({
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null,
    enableOfflineQueue: true,
    connectTimeout: 10000,
    retryStrategy(times) {
        return Math.min(times * 100, 10000);
    }
});

redis.on('connect', () => {
    if (isRedisDown) {
        console.log('Redis reconnected!');
    } else {
        console.log('Redis connected successfully');
    }
    isRedisDown = false;
});

redis.on('error', (err) => {
    if (!isRedisDown) {
        console.error('Redis is down, retrying in background:', err);
        isRedisDown = true;
    }
});

export default redis;