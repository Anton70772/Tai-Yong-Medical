import express from 'express';
import { getAllClients, getClientById, createClient, updateClient, deleteClient } from '../controllers/clientC';

const router = express.Router();

router.get('/clients', getAllClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

export default router;