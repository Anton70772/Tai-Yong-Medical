import { Request, Response } from 'express';
import PatientHistory from '../models/patienthistoryM';

export const getAllPatientHistory = async (req: Request, res: Response) => {
    try {
        const patientHistory = await PatientHistory.findAll();
        res.status(200).json(patientHistory);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении истории пациентов' });
    }
};

export const getPatientHistoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const history = await PatientHistory.findByPk(id);
        if (history) {
            const clientInfo = await history.getClientInfo();
            res.status(200).json({ history, clientInfo });
        } else {
            res.status(404).json({ error: 'Запись в истории пациента не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении записи в истории пациента' });
    }
};

export const createPatientHistory = async (req: Request, res: Response) => {
    const { description, date, state, clients_id } = req.body;
    try {
        const newPatientHistory = await PatientHistory.create({
            description,
            date,
            state,
            clients_id,
        });
        res.status(201).json(newPatientHistory);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании истории пациента' });
    }
};

export const updatePatientHistory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { description, date, state, clients_id } = req.body;
    try {
        const patientHistory = await PatientHistory.findByPk(id);
        if (patientHistory) {
            await patientHistory.update({ description, date, state, clients_id });
            res.status(200).json(patientHistory);
        } else {
            res.status(404).json({ error: 'История пациента не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении истории пациента' });
    }
};

export const deletePatientHistory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const patientHistory = await PatientHistory.findByPk(id);
        if (patientHistory) {
            await patientHistory.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'История пациента не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении истории пациента' });
    }
};