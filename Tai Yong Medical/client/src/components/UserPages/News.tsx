import styles from '../../assets/News.module.css';

const News = () => {
    return (
        <div className={styles.news}>
            <h2 className={styles.news__title}>Последние новости</h2>
            <div className={styles.news__list}>
                <div className={styles.news__item}>
                    <img src="/tym1.jpg" alt="Новое оборудование" className={styles.news__image} />
                    <div className={styles.news__content}>
                        <h3 className={styles.news__itemTitle}>Новое оборудование</h3>
                        <p className={styles.news__itemText}>Мы установили новое оборудование для улучшения качества протезирования.</p>
                    </div>
                </div>

                <div className={styles.news__item}>
                    <img src="/tym1.jpg" alt="Участие в благотворительных акциях" className={styles.news__image} />
                    <div className={styles.news__content}>
                        <h3 className={styles.news__itemTitle}>Участие в благотворительных акциях</h3>
                        <p className={styles.news__itemText}>Если ваша клиника принимает участие в благотворительных акциях или программных инициативах, поделитесь этой информацией.</p>
                    </div>
                </div>

                <div className={styles.news__item}>
                    <img src="/tym1.jpg" alt="Новости об оборудовании и услугах" className={styles.news__image} />
                    <div className={styles.news__content}>
                        <h3 className={styles.news__itemTitle}>Новости об оборудовании и услугах</h3>
                        <p className={styles.news__itemText}>Расскажите о любых обновлениях в оборудовании или новых услугах, которые стали доступны в вашей клинике.</p>
                    </div>
                </div>

                <div className={styles.news__item}>
                    <img src="/tym1.jpg" alt="Советы по уходу за протезами" className={styles.news__image} />
                    <div className={styles.news__content}>
                        <h3 className={styles.news__itemTitle}>Советы по уходу за протезами</h3>
                        <p className={styles.news__itemText}>Предоставьте полезные советы и рекомендации пациентам о том, как правильно ухаживать за своими протезами.</p>
                    </div>
                </div>

                <div className={styles.news__item}>
                    <img src="/tym1.jpg" alt="Советы по уходу за протезами" className={styles.news__image} />
                    <div className={styles.news__content}>
                        <h3 className={styles.news__itemTitle}>Новые технологии в протезировании</h3>
                        <p className={styles.news__itemText}>Расскажите о последних достижениях в области протезирования, новых материалах или технологиях, которые ваша клиника внедряет для улучшения качества услуг.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;