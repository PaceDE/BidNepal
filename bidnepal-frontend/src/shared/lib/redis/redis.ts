import Redis from "ioredis";

declare global {
    var redis: Redis | undefined;
}

export const redis =
    global.redis ??
    new Redis({
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT),
        maxRetriesPerRequest: 0,
        enableOfflineQueue: false,
        connectTimeout: 10000,
        commandTimeout: 2000,
    });

global.redis = redis;

let isRedisDown = false;

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