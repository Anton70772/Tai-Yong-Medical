import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/Profile.module.css';
import { IProfile } from '../types/IProfile';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const navigate = useNavigate();

    interface IError {
        response: {
            status: number;
            data: {
                error: string;
            };
        };
    }

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:4200/client/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (error) {
                const err = error as IError;
                if (err.response && err.response.status === 403 && err.response.data.error === 'Истек срок токена') {
                    const refreshResponse = await axios.get('http://localhost:4200/client/refreshToken', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    localStorage.setItem('token', refreshResponse.data.token);
                    const newResponse = await axios.get('http://localhost:4200/client/profile', {
                        headers: {
                            'Authorization': `Bearer ${refreshResponse.data.token}`
                        }
                    });
                    setProfile(newResponse.data);
                } else {
                    console.error('Ошибка при получении данных:', error);
                }
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/authorization');
    };

    if (!profile) {
        return (
            <div>
                <p>Вы не авторизованы.</p>
                <p>Вы можете <Link to="/authorization">войти</Link> в свой аккаунт.</p>
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileTitle}>Профиль</h1>
            <p className={styles.profileItem}><strong>Имя:</strong> {profile.Name}</p>
            <p className={styles.profileItem}><strong>Фамилия:</strong> {profile.surName}</p>
            <p className={styles.profileItem}><strong>Отчество:</strong> {profile.lastName}</p>
            <p className={styles.profileItem}><strong>Дата рождения:</strong> {profile.birthday}</p>
            <p className={styles.profileItem}><strong>Email:</strong> {profile.email}</p>
            <p className={styles.profileItem}><strong>Телефон:</strong> {profile.phone}</p>
            <button className={styles.logoutButton} onClick={handleLogout}>Выйти</button>
        </div>
    );
};

export default Profile;