import redis from "./redis";
import { NextRequest } from "next/server";
import { getClientIp } from "@/shared/utils/ip";



const memory = new Map<string, { count: number; expiresIn: number }>();

const TIME_FRAME = 60; // 60 seconds

const NORMAL_LIMIT = 60;

const FALLBACK_LIMIT = 30;

export async function rateLimit(key: string): Promise<{ allowed: boolean; mode?: string }> {
    const now = Date.now();
    try {
        if (redis.status !== 'ready') {
            throw new Error('Redis not ready');
        }
        const count = await redis.incr(key);

        if (count === 1)
            await redis.expire(key, TIME_FRAME);
        return {
            allowed: count <= NORMAL_LIMIT,
            mode: 'redis',
        };
    } catch (err) {
         console.error("Redis down, using fallback rate limit:", err);

         // Falllback using in-memory store.
         const record = memory.get(key)
         if(!record || now > record.expiresIn) {
            memory.set(key, { count: 1, expiresIn: now + TIME_FRAME * 1000 });
            return { allowed: true, mode: "fallback" };
         }

         record.count++;

         return{
            allowed: record.count <= FALLBACK_LIMIT,
            mode: "fallback"
         }
    }

}

export async function useRateLimit(req: NextRequest) {
    const ip = getClientIp(req);

    const key = ip
        ? `rate:${ip}`
        : `rate:missing:${req.nextUrl.pathname}`;

    const result = await rateLimit(key);

    return result;
}
