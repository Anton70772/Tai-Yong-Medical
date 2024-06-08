import { Request, Response } from 'express';
import Client from '../models/clientM';
import Doctor from '../models/doctorsM';
import jwt from 'jsonwebtoken';

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении клиентов' });
    }
};

export const getClientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ error: 'Клиент не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении клиента' });
    }
};

export const createClient = async (req: Request, res: Response) => {
    const { Name, surName, lastName, birthday, gender, phone, email, password } = req.body;
    try {
        const newClient = await Client.create({
            Name,
            surName,
            lastName,
            birthday,
            // gender,
            phone,
            email,
            password,
        });
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании клиента' });
    }
};

export const secretKey = 'SecretTaiYong';

export const getProfile = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decodedToken = jwt.verify(token, secretKey) as { clientId: number, role: string };
        const client = await Client.findByPk(decodedToken.clientId);
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ error: 'Клиент не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении профиля' });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decodedToken = jwt.verify(token, secretKey) as { clientId: number, role: string };
        const newToken = jwt.sign(decodedToken, secretKey, { expiresIn: '7d' });
        res.status(200).json({ message: 'Токен успешно обновлен', token: newToken });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении токена' });
    }
};

export const loginClient = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const client = await Client.findOne({ where: { email } });

        if (client) {
            if (client.password === password) {
                let role = 'user';

                if (password === 'administrator') {
                    role = 'administrator';
                } else if (password === 'stafferMedical') {
                    role = 'stafferMedical';
                }

                const token = jwt.sign({ clientId: client.id, role }, secretKey, { expiresIn: '7d' });
                console.log('Успешная авторизация клиента с ролью:', role);
                return res.status(200).json({ message: 'Авторизация успешна', token });
            } else {
                console.log('Неверный пароль для клиента');
                return res.status(401).json({ message: 'Неверный пароль' });
            }
        } else {
            const doctor = await Doctor.findOne({ where: { email } });

            if (doctor) {
                if (doctor.password === password) {
                    let role = 'stafferMedical';

                    if (password === 'administrator') {
                        role = 'administrator';
                    }

                    const token = jwt.sign({ doctorId: doctor.id, role }, secretKey, { expiresIn: '1h' });
                    console.log('Успешная авторизация врача с ролью:', role);
                    return res.status(200).json({ message: 'Авторизация успешна', token });
                } else {
                    console.log('Неверный пароль для врача');
                    return res.status(401).json({ message: 'Неверный пароль' });
                }
            } else {
                console.log('Пользователь с таким email не найден');
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
        }
    } catch (error) {
        console.error('Ошибка при авторизации:', error);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { Name, surName, lastName, birthday, gender, phone, email, password } = req.body;
    try {
        const client = await Client.findByPk(id);
        if (client) {
            await client.update({ Name, surName, lastName, birthday, gender, phone, email, password });
            res.status(200).json(client);
        } else {
            res.status(404).json({ error: 'Клиент не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении клиента' });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (client) {
            await client.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Клиент не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении клиента' });
    }
};