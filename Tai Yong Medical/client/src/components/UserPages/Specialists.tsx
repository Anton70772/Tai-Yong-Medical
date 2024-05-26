import { useEffect, useState } from 'react';
import axios from 'axios';
import { Doctor } from '../types/IDoctor';
import styles from '../../assets/Specialists.module.css';

const Specialists = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:4200/doctor/doctors');
                console.log('API response:', response.data);
                if (Array.isArray(response.data)) {
                    setDoctors(response.data);
                } else {
                    console.error('Ошибка данных:', response.data);
                }
            } catch (error) {
                console.error('Ошибка при загрузке списка докторов:', error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Наши специалисты</h1>
            <div className={styles.cards}>
                {doctors.map((doctor) => (
                    <div key={doctor.id} className={styles.card}>
                        <img src={doctor.photo} alt={doctor.fullName} className={styles.card__photo} />
                        <h2 className={styles.card__name}>{doctor.fullName}</h2>
                        <p className={styles.card__description}>{doctor.position}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Specialists;