import '../../assets/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-heading">Контакты</h3>
                    <p>Адрес: ул. Центральная, д. 17</p>
                    <p>Телефон: +7 (930) 456-78-90</p>
                    <p>Email: taiyongmedical@yandex.ru</p>
                </div>
                <div className="footer-section">
                    <h3 className="footer-heading">О нас</h3>
                    <p>Добро пожаловать в Tai Yong Medical, мирового лидера в области биотехнологий и аугментаций. <br />
                     Наша миссия - улучшать качество жизни людей по всему миру с помощью передовых медицинских технологий.</p>
                </div>
                <div className="footer-section">
                    <h3 className="footer-heading">Соцсети</h3>
                    <ul className="social-links">
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Twitter</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Tai Yong Medical. Все права защищены.</p>
            </div>
        </footer>
    );
}

export default Footer;