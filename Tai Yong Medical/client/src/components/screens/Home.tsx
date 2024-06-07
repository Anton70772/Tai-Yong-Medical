import styles from '../../assets/Home.module.css';

const Home = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.container__title}>Добро пожаловать в Tai Yong Medical</h1>
            <p className={styles.container__subtitle}>Мы заботимся о вашем здоровье и качестве жизни!</p>
            <div className={styles.info}>
                <div className={styles.info__item}>
                    <span className={styles.info__number}>Свыше 10</span>
                    <span className={styles.info__text}>лет успешной работы</span>
                </div>

                <div className={styles.info__item}>
                    <span className={styles.info__number}>Более 10</span>
                    <span className={styles.info__text}>опытных врачей-хирургов</span>
                </div>

                <div className={styles.info__item}>
                    <span className={styles.info__number}>Более 25</span>
                    <span className={styles.info__text}>Высокотехнологичных протезов</span>
                </div>
            </div>

            <div className={styles.Appointment}></div>

            <div className={styles.advantages}>
                <h2 className={styles.advantages__title}>Наши Преимущества</h2>
                <div className={styles.advantages__list}>
                    <div className={styles.advantages__item}>
                        <h3 className={styles.advantages__itemTitle}>Персонализированный подход</h3>
                        <p className={styles.advantages__itemText}>Мы подбираем протезы, идеально подходящие для каждого пациента, учитывая их индивидуальные потребности и образ жизни.</p>
                    </div>
                    <div className={styles.advantages__item}>
                        <h3 className={styles.advantages__itemTitle}>Передовые технологии</h3>
                        <p className={styles.advantages__itemText}>Мы устанавливаем протезы с использованием новейших технологий, обеспечивающих максимальный комфорт и функциональность.</p>
                    </div>
                    <div className={styles.advantages__item}>
                        <h3 className={styles.advantages__itemTitle}>Профессиональная команда</h3>
                        <p className={styles.advantages__itemText}>Наши специалисты постоянно совершенствуют свои навыки и знания, чтобы предоставлять вам лучшие медицинские услуги.</p>
                    </div>
                </div>
            </div>

            {/* <button className={styles.addAppointment}>Онлайн запись</button> */}
        </div>
    );
}

export default Home;