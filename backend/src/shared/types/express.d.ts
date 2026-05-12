import { JwtPayload } from "./token.types.ts";

declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }
    }
}
export {};