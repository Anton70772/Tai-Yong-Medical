import { Request, Response } from 'express';
import Appointment from '../models/appointmentsM';
import jwt from 'jsonwebtoken';
import { secretKey } from './clientC'

export const getAllAppointments = async (req: Request, res: Response) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении списка записей' });
    }
};

export const getAppointmentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (appointment) {
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ error: 'Запись не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении информации о записи' });
    }
};

export const createAppointment = async (req: Request, res: Response) => {
    const { dateTime, room, status, doctors_id, services_id } = req.body;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        if (!token) {
            return res.status(401).json({ error: 'Токен не найден' });
        }

        const decodedToken = jwt.verify(token, secretKey) as { clientId: number, role: string };
        const clients_id = decodedToken.clientId;

        const newAppointment = await Appointment.create({
            dateTime,
            room,
            status,
            clients_id,
            doctors_id,
            services_id,
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при создании новой записи' });
    }
};

export const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { dateTime, room, status, clients_id, doctors_id, services_id } = req.body;
    try {
        const appointment = await Appointment.findByPk(id);
        if (appointment) {
            await appointment.update({ dateTime, room, status, clients_id, doctors_id, services_id });
            res.status(200).json(appointment);
        } else {
            res.status(404).json({ error: 'Запись не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении записи' });
    }
};

export const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (appointment) {
            await appointment.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Запись не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении записи' });
    }
};