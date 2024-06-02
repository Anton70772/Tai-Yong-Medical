export interface IUser {
    clientId: number;
    role: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: IUser;
    }
}