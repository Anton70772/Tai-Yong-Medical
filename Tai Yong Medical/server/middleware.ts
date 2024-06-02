import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from './types/IUser';

const secretKey = 'SecretTaiYong';

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log('Token verification failed', err);
            return res.sendStatus(403);
        }
        req.user = user as IUser;
        console.log('Token verified, user:', req.user);
        next();
    });
};