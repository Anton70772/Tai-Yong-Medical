import { Request, Response } from 'express';
import Prosthetic from '../models/prostheticsM';

export const getAllProsthetics = async (req: Request, res: Response) => {
    try {
        const prosthetics = await Prosthetic.findAll();
        res.status(200).json(prosthetics);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении протезов' });
    }
};

export const getProstheticById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const prosthetic = await Prosthetic.findByPk(id);
        if (prosthetic) {
            res.status(200).json(prosthetic);
        } else {
            res.status(404).json({ error: 'Протез не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении протеза' });
    }
};

export const createProsthetic = async (req: Request, res: Response) => {
    const { product_name, manufacturer, price, count, description, image } = req.body;
    try {
        const newProsthetic = await Prosthetic.create({
            product_name,
            manufacturer,
            price,
            count,
            description,
            image,
        });
        res.status(201).json(newProsthetic);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании протеза' });
    }
};

export const updateProsthetic = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { product_name, manufacturer, price, count, description, image } = req.body;
    try {
        const prosthetic = await Prosthetic.findByPk(id);
        if (prosthetic) {
            await prosthetic.update({ product_name, manufacturer, price, count, description, image });
            res.status(200).json(prosthetic);
        } else {
            res.status(404).json({ error: 'Протез не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении протеза' });
    }
};

export const deleteProsthetic = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const prosthetic = await Prosthetic.findByPk(id);
        if (prosthetic) {
            await prosthetic.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Протез не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении протеза' });
    }
};