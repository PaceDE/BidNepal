import { createProxyHandler } from "@/shared/lib/api/proxyHandler";

const handler = createProxyHandler();

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;