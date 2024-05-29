import { Request, Response } from 'express';
import News from '../models/newsM';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'images/news'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const getAllNews = async (req: Request, res: Response) => {
    try {
        const news = await News.findAll();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении новостей' });
    }
};

export const getNewsId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const news = await News.findByPk(id);
        if (news) {
            res.status(200).json(news);
        } else {
            res.status(404).json({ error: 'Новость не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении новости' });
    }
};

export const createNews = [upload.single('picture'), async (req: MulterRequest, res: Response) => {
    const { title, subTitle } = req.body;
    const photoPath = req.file ? `/images/news/${req.file.filename}` : null;

    try {
        const newNews = await News.create({
            title,
            subTitle,
            picture: photoPath,
        });
        res.status(201).json(newNews);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании нового доктора' });
    }
}];

export const updateNews = [upload.single('picture'), async (req: MulterRequest, res: Response) => {
    const { id } = req.params;
    const { title, subTitle } = req.body;
    const photoPath = req.file ? `/images/news/${req.file.filename}` : null;

    try {
        const news = await News.findByPk(id);
        if (news) {
            await news.update({
                title,
                subTitle,
                picture: photoPath ? photoPath : news.picture
            });
            res.status(200).json(news);
        } else {
            res.status(404).json({ error: 'Новость не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при обновлении новости' });
    }
}];

export const deleteNews = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const news = await News.findByPk(id);
        if (news) {
            await news.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Новость не найдена' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при удалении новости' });
    }
};