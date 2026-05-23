export class AppError extends Error {
    statusCode: number
    errors?: Record<string,string[]>
    clearCookie?: string[]

    constructor(message: string, statusCode: number, 
        options?:{
            errors?: Record<string,string[]>,
            clearCookie?: string[]
        }
    ) {
        super(message)
        this.statusCode = statusCode
        if(options?.errors)
            this.errors = options.errors
        if(options?.clearCookie)
            this.clearCookie = options.clearCookie;

        Error.captureStackTrace(this, this.constructor)
    }
}