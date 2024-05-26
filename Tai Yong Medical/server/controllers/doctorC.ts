import { Request, Response } from 'express';
import Doctor from '../models/doctorsM';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/images/doctors');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const getAllDoctors = async (req: Request, res: Response) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении списка докторов' });
    }
};

export const getDoctorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            res.status(200).json(doctor);
        } else {
            res.status(404).json({ error: 'Доктор не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении информации о докторе' });
    }
};

export const createDoctor = [upload.single('photo'), async (req: MulterRequest, res: Response) => {
    const { fullName, position, work_experience_start_day, phone } = req.body;
    const photoPath = req.file ? `/images/doctors/${req.file.filename}` : null;

    try {
        const newDoctor = await Doctor.create({
            fullName,
            position,
            work_experience_start_day,
            phone,
            photo: photoPath,
        });
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании нового доктора' });
    }
}];

export const updateDoctor = [upload.single('photo'), async (req: MulterRequest, res: Response) => {
    const { id } = req.params;
    const { fullName, position, work_experience_start_day, phone } = req.body;
    const photoPath = req.file ? `/images/doctors/${req.file.filename}` : null;

    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            await doctor.update({
                fullName,
                position,
                work_experience_start_day,
                phone,
                photo: photoPath ? photoPath : doctor.photo
            });
            res.status(200).json(doctor);
        } else {
            res.status(404).json({ error: 'Доктор не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении информации о докторе' });
    }
}];

export const deleteDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            await doctor.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Доктор не найден' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении доктора' });
    }
};