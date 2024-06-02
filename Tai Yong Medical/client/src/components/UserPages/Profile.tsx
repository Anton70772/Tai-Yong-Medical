import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/Profile.module.css';
import { IProfile } from '../types/IProfile';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [profile, setProfile] = useState<IProfile | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:4200/client/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => setProfile(response.data))
            .catch(error => console.error('Ошибка при получении данных:', error));
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