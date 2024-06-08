import { useEffect, useState } from 'react';
import axios from 'axios';
import { INews } from '../types/INews.ts';
import styles from '../../assets/AdminNews.module.css';

const AdminNews = () => {
    const [news, setNews] = useState<INews[]>([]);
    const [newNewsData, setNewNewsData] = useState({ title: '', subTitle: '', picture: null });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:4200/news/news');
            setNews(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    const addNews = async () => {
        const formData = new FormData();
        formData.append('title', newNewsData.title);
        formData.append('subTitle', newNewsData.subTitle);
        if (newNewsData.picture) {
            formData.append('picture', newNewsData.picture);
        }

        try {
            const response = await axios.post('http://localhost:4200/news/news', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNews([...news, response.data]);
            setNewNewsData({ title: '', subTitle: '', picture: null });
        } catch (error) {
            console.error('Ошибка при добавлении новости:', error);
        }
    };

    const updateNews = async (updatedNews) => {
        try {
            const response = await axios.put(`http://localhost:4200/news/news/${updatedNews.id}`, updatedNews);
            const updatedIndex = news.findIndex(item => item.id === updatedNews.id);
            const updatedNewsList = [...news];
            updatedNewsList[updatedIndex] = response.data;
            setNews(updatedNewsList);
        } catch (error) {
            console.error('Ошибка при обновлении новости:', error);
        }
    };

    const deleteNews = async (id) => {
        try {
            await axios.delete(`http://localhost:4200/news/news/${id}`);
            setNews(news.filter(item => item.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении новости:', error);
        }
    };

    return (
        <div className={styles.news}>
            <h2 className={styles.news__title}>Последние новости</h2>
            <div className={styles.news__list}>
                {news.map((newsItem) => (
                    <div key={newsItem.id} className={styles.news__item}>
                        <img src={`http://localhost:4200${newsItem.picture}`} alt={newsItem.title} className={styles.news__image} />
                        <div className={styles.news__content}>
                            <h3 className={styles.news__itemTitle}>{newsItem.title}</h3>
                            <p className={styles.news__itemText}>{newsItem.subTitle}</p>
                            <div className={styles.news__actions}>
                                <button className={styles.news__button} onClick={() => updateNews(newsItem)}>Редактировать</button>
                                <button className={styles.news__button} onClick={() => deleteNews(newsItem.id)}>Удалить</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.news__form}>
                <input type="text" placeholder="Заголовок" value={newNewsData.title} onChange={(e) => setNewNewsData({ ...newNewsData, title: e.target.value })} />
                <input type="text" placeholder="Подзаголовок" value={newNewsData.subTitle} onChange={(e) => setNewNewsData({ ...newNewsData, subTitle: e.target.value })} />
                <input type="file" onChange={(e) => setNewNewsData({ ...newNewsData, picture: e.target.files[0] })} />
                <button className={styles.news__button} onClick={addNews}>Добавить новость</button>
            </div>
        </div>
    );
}

export default AdminNews;