import { Request, Response } from 'express';
import Service from '../models/servicesM';

export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении услуг' });
    }
};

export const getServiceById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (service) {
            res.status(200).json(service);
        } else {
            res.status(404).json({ error: 'Услуга не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении услуги' });
    }
};

export const createService = async (req: Request, res: Response) => {
    const { name, description, price, required_documents, doctors_id } = req.body;
    try {
        const newService = await Service.create({
            name,
            description,
            price,
            required_documents,
            doctors_id,
        });
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании услуги' });
    }
};

export const updateService = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, required_documents, doctors_id } = req.body;
    try {
        const service = await Service.findByPk(id);
        if (service) {
            await service.update({ name, description, price, required_documents, doctors_id });
            res.status(200).json(service);
        } else {
            res.status(404).json({ error: 'Услуга не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении услуги' });
    }
};

export const deleteService = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (service) {
            await service.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Услуга не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении услуги' });
    }
};