import express from 'express';
import { getAllClients, getClientById, createClient, updateClient, deleteClient, loginClient, getProfile, refreshToken } from '../controllers/clientC';
import { authToken } from '../middleware';

const router = express.Router();

router.get('/clients', getAllClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);
router.post('/login', loginClient);
router.put('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

router.get('/profile', authToken, getProfile);
router.post('/refresh-token', authToken, refreshToken);

export default router;