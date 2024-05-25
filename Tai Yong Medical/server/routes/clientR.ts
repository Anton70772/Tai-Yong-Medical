import express from 'express';
import { getAllClients, getClientById, createClient, updateClient, deleteClient, loginClient } from '../controllers/clientC';

const router = express.Router();

router.get('/clients', getAllClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);
router.post('/login', loginClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

export default router;