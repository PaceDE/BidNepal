export function getClientIp(req: Request): string | null {
    const xff = req.headers.get('x-forwarded-for') 
    if(xff) return xff.split(',')[0].trim();

    const realIp = req.headers.get('x-real-ip');
    if(realIp) return realIp.trim();

    return null
}