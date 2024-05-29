import { useEffect, useState } from 'react';
import axios from 'axios';
import { IServices } from '../types/IService';
import styles from '../../assets/Services.module.css';

const Services = () => {
    const [services, setServices] = useState<IServices[]>([]);

    useEffect(() => {
        axios.get('http://localhost:4200/service/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Ошибка при получении данных:', error));
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Услуги и Цены</h1>
            <div className={styles.servicesList}>
                {services.map(service => (
                    <div key={service.id} className={styles.card}>
                        <h2 className={styles.name}>{service.name}</h2>
                        <p className={styles.description}>{service.description}</p>
                        <p className={styles.price}>Цена: {service.price} $</p>
                        <p className={styles.documents}>Необходимые документы: {service.required_documents}</p>

                        <button className={styles.details}>Подробнее</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;