import { Link } from 'react-router-dom';
import '../../assets/header.css';
import { useEffect, useState } from 'react';

const Header = () => {
    const [role, setRole] = useState('');

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken && decodedToken.role) {
                setRole(decodedToken.role);
            }
        }
    }, []);

    const parseJwt = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    };

    return (
        <div className='header-container'>
            <nav className="nav">
                <div className="nav__group nav__group--left">
                    <Link className="nav__link" to="/">Главная</Link>
                    {role === 'administrator' && (
                        <Link className="nav__link" to="/services">Услуги и цены</Link>
                    )}
                    {role === 'administrator' && (
                        <Link className="nav__link" to="/specialists">Специалисты</Link>
                    )}
                </div>
                <div className="nav__brand">Tai Yong Medical</div>
                <div className="nav__group nav__group--right">
                    <Link className="nav__link" to="/gallery">Галерея</Link>
                    <Link className="nav__link" to="/news">Новости</Link>
                    <Link className="nav__link" to="/about">О нас</Link>
                </div>
            </nav>
        </div>
    );
}

export default Header;