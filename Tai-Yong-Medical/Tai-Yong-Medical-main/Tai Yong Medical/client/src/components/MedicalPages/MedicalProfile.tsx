import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../assets/MedicalProfile.module.css';
import { Doctor } from '../types/IDoctor';

const MedicalProfile: React.FC = () => {
    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchDoctor = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = parseJwt(token);
                if (decodedToken && decodedToken.doctorId) {
                    try {
                        const response = await axios.get(`http://localhost:4200/doctor/doctors/${decodedToken.doctorId}`);
                        setDoctor(response.data);
                    } catch (error) {
                        console.error('Ошибка при получении данных о докторе:', error);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    console.error('Доктор не найден в токене');
                    setLoading(false);
                }
            } else {
                console.error('Токен не найден');
                setLoading(false);
            }
        };

        fetchDoctor();
    }, []);

    const Logout = () => {
        localStorage.removeItem('token');
        navigate('/authorization');
    };

    if (loading) {
        return <div>Подождите, загружается...</div>;
    }

    if (!doctor) {
        return <div>Доктор не найден</div>;
    }

    return (
        <div className={styles.medical_profile_container}>
            <div className={styles.profile_header}>
                <img src={`http://localhost:4200${doctor.photo}`} alt={`${doctor.fullName}`} className={styles.profile_photo} />
                <h1>{doctor.fullName}</h1>
            </div>
            <div className={styles.profile_details}>
                <p><strong>Должность:</strong> {doctor.position}</p>
                <p><strong>Телефон:</strong> {doctor.phone}</p>
                <p><strong>Email:</strong> {doctor.email}</p>
                <p><strong>Пароль:</strong> {doctor.password}</p>
                <p><strong>Дата начала трудового стажа:</strong> {new Date(doctor.work_experience_start_day).toLocaleDateString()}</p>
                <button className={styles.logoutButton} onClick={Logout}>Выйти</button>
            </div>
        </div>
    );
};

export default MedicalProfile;