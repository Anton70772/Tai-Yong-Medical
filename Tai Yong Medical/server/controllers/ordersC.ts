import { Request, Response } from 'express';
import Order from '../models/ordersM';

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: 'Заказ не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении заказа' });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    const { order_name, price, count, date, status, doctors_id, prosthetics_id } = req.body;
    try {
        const newOrder = await Order.create({
            order_name,
            price,
            count,
            date,
            status,
            doctors_id,
            prosthetics_id,
        });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании заказа' });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { order_name, price, count, date, status, doctors_id, prosthetics_id } = req.body;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            await order.update({ order_name, price, count, date, status, doctors_id, prosthetics_id });
            res.status(200).json(order);
        } else {
            res.status(404).json({ error: 'Заказ не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении заказа' });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await Order.findByPk(id);
        if (order) {
            await order.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Заказ не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении заказа' });
    }
};