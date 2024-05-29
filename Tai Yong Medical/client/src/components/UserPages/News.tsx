import { useEffect, useState } from 'react';
import axios from 'axios';
import { INews } from '../types/INews.ts';
import styles from '../../assets/News.module.css';

const News = () => {
    const [news, setNews] = useState<INews[]>([]);

    // useEffect(() => {
    //     const getNews = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:4200/news/news');
    //             if (Array.isArray(response.data)) {
    //                 setNews(response.data);
    //             } else {
    //                 console.error('Ошибка при получении данных:', response.data);
    //             }
    //         } catch (error) {
    //             console.error('Ошибка при загрузке новостей:', error);
    //         }
    //     };

    //     getNews();
    // }, []);

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

        // <div className={styles.news}>
        //     <h2 className={styles.news__title}>Последние новости</h2>
        //     <div className={styles.news__list}>

        //         <div className={styles.news__item}>
        //             <img src="/tym1.jpg" className={styles.news__image} />
        //             <div className={styles.news__content}>
        //                 <h3 className={styles.news__itemTitle}>Новое оборудование</h3>
        //                 <p className={styles.news__itemText}>Мы установили новое оборудование для улучшения качества протезирования.</p>
        //             </div>
        //         </div>

        //         <div className={styles.news__item}>
        //             <img src="/tym1.jpg" className={styles.news__image} />
        //             <div className={styles.news__content}>
        //                 <h3 className={styles.news__itemTitle}>Участие в благотворительных акциях</h3>
        //                 <p className={styles.news__itemText}>Если ваша клиника принимает участие в благотворительных акциях или программных инициативах, поделитесь этой информацией.</p>
        //             </div>
        //         </div>

        //         <div className={styles.news__item}>
        //             <img src="/tym1.jpg" className={styles.news__image} />
        //             <div className={styles.news__content}>
        //                 <h3 className={styles.news__itemTitle}>Новости об оборудовании и услугах</h3>
        //                 <p className={styles.news__itemText}>Расскажите о любых обновлениях в оборудовании или новых услугах, которые стали доступны в вашей клинике.</p>
        //             </div>
        //         </div>

        //         <div className={styles.news__item}>
        //             <img src="/tym1.jpg" className={styles.news__image} />
        //             <div className={styles.news__content}>
        //                 <h3 className={styles.news__itemTitle}>Советы по уходу за протезами</h3>
        //                 <p className={styles.news__itemText}>Предоставьте полезные советы и рекомендации пациентам о том, как правильно ухаживать за своими протезами.</p>
        //             </div>
        //         </div>

        //         <div className={styles.news__item}>
        //             <img src="/tym1.jpg" className={styles.news__image} />
        //             <div className={styles.news__content}>
        //                 <h3 className={styles.news__itemTitle}>Новые технологии в протезировании</h3>
        //                 <p className={styles.news__itemText}>Расскажите о последних достижениях в области протезирования, новых материалах или технологиях, которые ваша клиника внедряет для улучшения качества услуг.</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default News;