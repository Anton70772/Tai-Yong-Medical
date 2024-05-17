import { Request, Response } from 'express';
import Appointment from '../models/appointmentsM';

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
    const { dateTime, room, status, clients_id, doctors_id, services_id } = req.body;
    try {
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