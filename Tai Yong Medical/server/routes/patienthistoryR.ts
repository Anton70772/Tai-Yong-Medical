import express from 'express';
import { getAllPatientHistory, getPatientHistoryById, createPatientHistory, updatePatientHistory, deletePatientHistory } from '../controllers/patienthistoryC';

const router = express.Router();

router.get('/patientHistory', getAllPatientHistory);
router.get('/patientHistory/:id', getPatientHistoryById);
router.post('/patientHistory', createPatientHistory);
router.put('/patientHistory/:id', updatePatientHistory);
router.delete('/patientHistory/:id', deletePatientHistory);

export default router;