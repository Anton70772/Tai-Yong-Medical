import { Request, Response } from 'express';
import Client from '../models/clientM';

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
            gender,
            phone,
            email,
            password,
        });
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании клиента' });
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