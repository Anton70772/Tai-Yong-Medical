import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from './types/IUser';

const secretKey = 'SecretTaiYong';

export const authToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('Нет токена');
        return res.sendStatus(401);
    }

    console.log('Полученный токен:', token);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log('Токен не прошел проверку', err);
            return res.sendStatus(403);
        }
        req.user = user as IUser;
        console.log('Токен подтвержден, user:', req.user);
        next();
    });
};