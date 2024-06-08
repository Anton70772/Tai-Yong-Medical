import express from 'express';
import { getAllNews, getNewsId, createNews, updateNews, deleteNews } from '../controllers/newsC';

const router = express.Router();

router.get('/news', getAllNews);
router.get('/news/:id', getNewsId);
router.post('/news', createNews);
router.put('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

export default router;