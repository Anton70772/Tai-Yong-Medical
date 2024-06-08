import { Request, Response } from 'express';
import ServicesReport from '../models/servicesReportsM';

export const getAllServicesReports = async (req: Request, res: Response) => {
    try {
        const reports = await ServicesReport.findAll();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении отчетов о услугах' });
    }
};

export const getServicesReportById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const report = await ServicesReport.findByPk(id);
        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).json({ error: 'Отчет о услуге не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении отчета о услуге' });
    }
};

export const createServicesReport = async (req: Request, res: Response) => {
    const { date, services, notes, doctors_id, services_id } = req.body;
    try {
        const newReport = await ServicesReport.create({
            date,
            services,
            notes,
            doctors_id,
            services_id,
        });
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании отчета о услуге' });
    }
};

export const updateServicesReport = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { date, services, notes, doctors_id, services_id } = req.body;
    try {
        const report = await ServicesReport.findByPk(id);
        if (report) {
            await report.update({ date, services, notes, doctors_id, services_id });
            res.status(200).json(report);
        } else {
            res.status(404).json({ error: 'Отчет о услуге не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении отчета о услуге' });
    }
};

export const deleteServicesReport = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const report = await ServicesReport.findByPk(id);
        if (report) {
            await report.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Отчет о услуге не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении отчета о услуге' });
    }
};