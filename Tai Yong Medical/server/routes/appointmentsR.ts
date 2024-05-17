import express from 'express';
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointmentsC';

const router = express.Router();

router.get('/appointments', getAllAppointments);
router.get('/appointments/:id', getAppointmentById);
router.post('/appointments', createAppointment);
router.put('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);

export default router;