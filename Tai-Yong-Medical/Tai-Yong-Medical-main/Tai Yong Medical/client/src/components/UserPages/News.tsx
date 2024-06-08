import { useEffect, useState } from 'react';
import axios from 'axios';
import { INews } from '../types/INews.ts';
import styles from '../../assets/News.module.css';

const News = () => {
    const [news, setNews] = useState<INews[]>([]);

    useEffect(() => {
        axios.get('http://localhost:4200/news/news')
            .then(response => setNews(response.data))
            .catch(error => console.error('Ошибка при получении данных:', error));
    }, []);

    return (
        <div className={styles.news}>
            <h2 className={styles.news__title}>Последние новости</h2>
            <div className={styles.news__list}>
                {news.map((news) => (
                    <div key={news.id} className={styles.news__item}>
                        <img src={`http://localhost:4200${news.picture}`} alt={news.title} className={styles.news__image} />
                        <div className={styles.news__content}>
                            <h3 className={styles.news__itemTitle}>{news.title}</h3>
                            <p className={styles.news__itemText}>{news.subTitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default News;