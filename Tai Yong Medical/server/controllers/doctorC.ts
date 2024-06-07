import { Request, Response } from 'express';
import Doctor from '../models/doctorsM';
import Service from '../models/servicesM';
import Appointment from '../models/appointmentsM';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'images', 'doctors'));
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
        console.error('Ошибка при получении списка докторов:', error);
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
        console.error(`Ошибка при получении информации о докторе с ID ${id}:`, error);
        res.status(500).json({ error: 'Ошибка при получении информации о докторе' });
    }
};

export const createDoctor = [upload.single('photo'), async (req: MulterRequest, res: Response) => {
    const { fullName, position, work_experience_start_day, phone, email, password } = req.body;
    const photoPath = req.file ? `/images/doctors/${req.file.filename}` : null;

    try {
        console.log('Данные из формы:', req.body);

        const newDoctor = await Doctor.create({
            fullName,
            position,
            work_experience_start_day,
            phone,
            photo: photoPath,
            email,
            password,
        });
        res.status(201).json(newDoctor);
    } catch (error) {
        console.error('Ошибка при создании нового доктора:', error);
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
            if (photoPath && doctor.photo) {
                const oldPhotoPath = path.join(__dirname, '..', doctor.photo);
                if (fs.existsSync(oldPhotoPath)) {
                    fs.unlinkSync(oldPhotoPath);
                }
            }
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
        console.error(`Ошибка при обновлении информации о докторе с ID ${id}:`, error);
        res.status(500).json({ error: 'Ошибка при обновлении информации о докторе' });
    }
}];

export const deleteDoctor = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const doctor = await Doctor.findByPk(id);
        if (doctor) {
            const services = await Service.findAll({ where: { doctors_id: id } });

            for (const service of services) {
                await Appointment.destroy({ where: { services_id: service.id } });
            }
            await Service.destroy({ where: { doctors_id: id } });

            if (doctor.photo) {
                const photoPath = path.join(__dirname, '..', doctor.photo);
                if (fs.existsSync(photoPath)) {
                    fs.unlinkSync(photoPath);
                }
            }

            await doctor.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Доктор не найден' });
        }
    } catch (error) {
        console.error(`Ошибка при удалении доктора с ID ${id}:`, error);
        res.status(500).json({ error: 'Ошибка при удалении доктора' });
    }
};