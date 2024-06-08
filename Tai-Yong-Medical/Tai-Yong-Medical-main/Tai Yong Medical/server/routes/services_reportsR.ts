import express from 'express';
import { getAllServicesReports, getServicesReportById, createServicesReport, updateServicesReport, deleteServicesReport } from '../controllers/services_reportsC';

const router = express.Router();

router.get('/servicesReports', getAllServicesReports);
router.get('/servicesReports/:id', getServicesReportById);
router.post('/servicesReports', createServicesReport);
router.put('/servicesReports/:id', updateServicesReport);
router.delete('/servicesReports/:id', deleteServicesReport);

export default router;