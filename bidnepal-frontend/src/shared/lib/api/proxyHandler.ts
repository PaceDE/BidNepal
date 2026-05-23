import { proxy } from "@/shared/lib/api/proxy";
import { NextRequest } from "next/server";

type Context = {
    params: Promise<{ path: string[] }>;
};

export function createProxyHandler(prefix = "") {
    return async (req: NextRequest, { params }: Context) => {
        const { path } = await params;
        const fullPath = `${prefix}/${path.join("/")}`;


        return proxy(req, fullPath);
    };
}