import { IPayload } from ".";

declare global {
    namespace Express {
        interface Request {
            user: IPayload
        }
    }
}

export { }