import styles from '../../assets/About.module.css';

const About = () => {
    return (
        <div className={styles.about}>
            <h1 className={styles.about__title}>О нас</h1>
            <p className={styles.about__intro}>
                Добро пожаловать в Tai Yong Medical, мирового лидера в области биотехнологий и аугментаций. Наша миссия - улучшать качество жизни людей по всему миру с помощью передовых медицинских технологий.
            </p>

            <div className={styles.about__section}>
                <h2 className={styles.about__sectionTitle}>Наша История</h2>
                <p className={styles.about__text}>
                    Tai Yong Medical была основана с целью революционизировать медицинскую индустрию. Мы начали с небольшого исследовательского центра и выросли в международную корпорацию, известную своими инновациями в области аугментаций.
                </p>
                <p className={styles.about__text}>
                    Наша история началась в Гонконге, где мы изначально сосредоточились на исследованиях и разработках. Со временем мы открыли офисы и исследовательские центры по всему миру, постоянно расширяя наше влияние и совершенствуя наши технологии.
                </p>
                <p className={styles.about__text}>
                    В 2027 году мы стали известны благодаря нашим передовым протезам, которые изменили жизнь тысяч людей. Наша приверженность качеству и инновациям позволила нам занять лидирующие позиции на мировом рынке.
                </p>
            </div>

            <div className={styles.about__section}>
                <h2 className={styles.about__sectionTitle}>Наши Ценности</h2>
                <p className={styles.about__text}>
                    В Tai Yong Medical мы ценим инновации, качество и безопасность. Мы стремимся к непрерывному развитию и внедрению новейших технологий для создания лучших продуктов и услуг для наших клиентов.
                </p>
                <p className={styles.about__text}>
                    Мы верим в важность ответственного использования технологий. Наши исследования направлены на создание безопасных и эффективных продуктов, которые помогают людям жить полной жизнью.
                </p>
                <p className={styles.about__text}>
                    Мы также стремимся к прозрачности и этическим стандартам в нашей работе. Каждый наш шаг нацелен на улучшение качества жизни людей, и мы гордимся своей репутацией надежного и ответственного партнера.
                </p>
            </div>

            <div className={styles.about__section}>
                <h2 className={styles.about__sectionTitle}>Что Мы Делаем</h2>
                <p className={styles.about__text}>
                    Наша компания специализируется на разработке и производстве передовых биотехнологических продуктов. Мы предлагаем широкий спектр аугментаций и протезов, которые помогают людям восстанавливать свои физические возможности и улучшать качество жизни.
                </p>
                <p className={styles.about__text}>
                    Наши продукты включают в себя протезы для конечностей, нейронные имплантаты и другие биотехнологические решения, которые разрабатываются с учетом индивидуальных потребностей каждого пациента. Мы используем новейшие материалы и технологии, чтобы обеспечить максимальный комфорт и функциональность.
                </p>
                <p className={styles.about__text}>
                    Мы также предоставляем комплексные услуги по установке и настройке наших продуктов, а также поддержку и обслуживание после установки. Наша команда специалистов всегда готова помочь нашим клиентам на каждом этапе их пути к восстановлению.
                </p>
            </div>

            <div className={styles.about__section}>
                <h2 className={styles.about__sectionTitle}>Будущее</h2>
                <p className={styles.about__text}>
                    Мы продолжаем стремиться к новым достижениям в области биотехнологий и медицинских исследований. Наша цель - сделать аугментации доступными для всех и помочь каждому человеку реализовать свой полный потенциал.
                </p>
                <p className={styles.about__text}>
                    В будущем мы планируем расширить наши исследования и разработки в области нейротехнологий и генетических модификаций. Мы верим, что эти технологии откроют новые возможности для улучшения здоровья и качества жизни людей.
                </p>
                <p className={styles.about__text}>
                    Мы также планируем усилить наше присутствие на международных рынках и продолжать работать над улучшением доступности наших продуктов и услуг для людей по всему миру.
                </p>
                <p className={styles.about__text}>
                    Наша приверженность инновациям и качеству остается неизменной, и мы с нетерпением ожидаем будущих достижений и успехов в области биотехнологий.
                </p>
            </div>
        </div>
    );
}

export default About;