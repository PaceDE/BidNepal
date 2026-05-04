import { Redis } from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST ?? "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null
})

redis.on('connect', ()=>{
    console.log('Redis connected succesfully');
})

redis.on('error',()=>{
    console.log("Some error occured in redis")
})
export default redis;