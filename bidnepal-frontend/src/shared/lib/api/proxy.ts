import { NextRequest, NextResponse } from "next/server";
import { CheckRateLimit } from "../redis/rateLimit";

const ALLOWED_HEADERS = new Set([
    "authorization",
    "cookie",
    "content-type",
    "accept",
    "accept-language",
    "user-agent",
    "origin",
    "referer",
    "x-csrf-token",
]);

const SKIP_RESPONSE_HEADERS = new Set([
    "transfer-encoding",
    "content-encoding",
    "connection",
    "keep-alive",
]);

// just makes the fetch to backend, returns raw response
export async function forwardProxyRequest(req: NextRequest, path: string): Promise<Response> {
    const url = `${process.env.BACKEND_URL}/api${path}`;
    const method = req.method;

    const headers = new Headers();
    for (const [key, value] of req.headers.entries()) {
        const k = key.toLowerCase();
        if (ALLOWED_HEADERS.has(k) || k.startsWith("x-")) {
            headers.set(k, value);
        }
    }

    const hasBody = method !== "GET" && method !== "HEAD";

    return fetch(url, {
        method,
        headers,
        body: hasBody ? req.body : undefined,
        ...(hasBody ? { duplex: "half" } : {}),
    });
}

// converts raw response to NextResponse forwarding headers
export function toNextResponse(response: Response): NextResponse {
    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
        if (!SKIP_RESPONSE_HEADERS.has(key.toLowerCase())) {
            if (key.toLowerCase() === "set-cookie") {
                responseHeaders.append(key, value);
            } else {
                responseHeaders.set(key, value);
            }
        }
    });

    return new NextResponse(response.body, {
        status: response.status,
        headers: responseHeaders,
    });
}

// proxy, just forward everything as is
type ProxyOptions = {
    transformResponse?: (res: Response, req?: NextRequest) => NextResponse | Promise<NextResponse>
}

export async function proxy(
    req: NextRequest,
    path: string,
    options: ProxyOptions = { }
): Promise<NextResponse> {
    try {
       

        const limit = await CheckRateLimit(req);
       
        if (!limit.allowed) {
            return NextResponse.json(
                { success: false, message: "Too many requests" },
                { status: 429 }
            );
        }

        try {
            const response = await forwardProxyRequest(req, path);
            if (options.transformResponse) {
                return await options.transformResponse(response, req)
            }
            return toNextResponse(response);
        } catch (error) {
            console.error("Error forwarding request:", error);
            return NextResponse.json(
                { success: false, message: "Internal server error" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Proxy error:", error);
        return NextResponse.json(
            { success: false, message: "Proxy error" },
            { status: 500 }
        );
    }
}