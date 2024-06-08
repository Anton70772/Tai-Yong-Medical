import express from 'express';
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment, getDoctorAppointments, updateAppointmentStatus, getClientAppointments } from '../controllers/appointmentsC';

const router = express.Router();

router.get('/appointments', getAllAppointments);
router.get('/appointments/:id', getAppointmentById);
router.get('/doctor', getDoctorAppointments);
router.post('/appointments', createAppointment);
router.put('/appointments/:id', updateAppointment);
router.delete('/appointments/:id', deleteAppointment);
router.put('/:id/status', updateAppointmentStatus);
router.get('/client/appointments', getClientAppointments);

export default router;