import { Link } from 'react-router-dom';
import '../../assets/header.css';
import { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";

const Header = () => {
    const [role, setRole] = useState('');

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            const decodedToken = parseJwt(token);
            if (decodedToken && decodedToken.role) {
                console.log('Роль:', decodedToken.role);
                setRole(decodedToken.role);
            } else {
                console.log('Роль не найдена в токене');
            }
        } else {
            console.log('Токен не найден');
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
            {role && (
                <nav className="nav">
                    {role === 'administrator' && (
                        <>
                            <Link className="nav__link" to="/">Главная</Link>
                            <Link className="nav__link" to="/services">Услуги и цены</Link>
                            <Link className="nav__link" to="/admin_specialists">Специалисты</Link>
                            <Link className="nav__link" to="/addClientAdmin">Клиенты</Link>

                            <div className="nav__logo">Tai Yong Medical</div>

                            <Link className="nav__link" to="/gallery">Галерея</Link>
                            <Link className="nav__link" to="/news">Новости</Link>
                            <Link className="nav__link" to="/about">О нас</Link>

                            <Link className="nav__link" to="/profile"><CgProfile /> </Link>
                        </>
                    )}
                    {role === 'stafferMedical' && (
                        <>
                            <Link className="nav__link" to="/">Главная</Link>
                            <Link className="nav__link" to="/medAppointments">Записи</Link>
                            <Link className="nav__link" to="/addpatient">Зарегистрировать клиента</Link>

                            <div className="nav__logo">Tai Yong Medical</div>

                            <Link className="nav__link" to="/orderingProsthesis">Заказать протез</Link>
                            <Link className="nav__link" to="/addAppointmentMed">Записать клиента на прием</Link>

                            <Link className="nav__link" to="/medProfile"><CgProfile /> </Link>
                        </>
                    )}
                    {role === 'user' && (
                        <>
                            <Link className="nav__link" to="/">Главная</Link>
                            <Link className="nav__link" to="/services">Услуги и цены</Link>
                            <Link className="nav__link" to="/specialists">Специалисты</Link>

                            <div className="nav__logo">Tai Yong Medical</div>

                            <Link className="nav__link" to="/galery">Галерея</Link>
                            <Link className="nav__link" to="/news">Новости</Link>
                            <Link className="nav__link" to="/about">О нас</Link>

                            <Link className="nav__link" to="/profile"><CgProfile /> </Link>
                        </>
                    )}
                </nav>
            )}
        </div>
    );
}

export default Header;