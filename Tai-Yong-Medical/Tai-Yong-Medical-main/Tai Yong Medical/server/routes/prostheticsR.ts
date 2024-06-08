import express from 'express';
import { getAllProsthetics, getProstheticById, createProsthetic, updateProsthetic, deleteProsthetic } from '../controllers/prostheticsC';

const router = express.Router();

router.get('/prosthetics', getAllProsthetics);
router.get('/prosthetics/:id', getProstheticById);
router.post('/prosthetics', createProsthetic);
router.put('/prosthetics/:id', updateProsthetic);
router.delete('/prosthetics/:id', deleteProsthetic);

export default router;