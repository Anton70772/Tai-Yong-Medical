import express from 'express';
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor } from '../controllers/doctorC';

const router = express.Router();

router.get('/doctors', getAllDoctors);
router.get('/doctors/:id', getDoctorById);
router.post('/doctors', createDoctor);
router.put('/doctors/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);

export default router;