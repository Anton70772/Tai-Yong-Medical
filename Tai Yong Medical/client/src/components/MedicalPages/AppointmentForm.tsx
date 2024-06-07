import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../assets/AddAppointment.module.css';
import { Doctor } from '../types/IDoctor';
import { IClient } from '../types/IClient';
import { IServices } from '../types/IService';

const AppointmentForm: React.FC<IClient> = ({ client, onClose }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectDoctor, setSelectDoctor] = useState<string | null>(null);
    const [services, setServices] = useState<IServices[]>([]);
    const [selectService, setSelectService] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('09:00');
    const [room] = useState<number>(Math.floor(Math.random() * 25) + 101);

    useEffect(() => {
        axios.get('http://localhost:4200/doctor/doctors')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Ошибка при получении данных:', error));

        axios.get('http://localhost:4200/service/services')
            .then(response => setServices(response.data))
            .catch(error => console.error('Ошибка при получении данных:', error));
    }, []);

    const addAppointment = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Токен не найден');
            return;
        }
    
        const clients_id = client.id;
        const dateTime = `${date}T${time}`;
    
        const data = {
            dateTime,
            room,
            status: 'Запись назначена',
            clients_id,
            doctors_id: selectDoctor,
            services_id: selectService,
        };
    
        axios.post('http://localhost:4200/appointments/appointments', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Запись успешно создана:', response.data);
            onClose();
        })
        .catch(error => console.error('Ошибка при создании записи:', error));
    };    

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00',
        '17:00', '18:00', '19:00'
    ];

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Запись на консультацию</h2>
                <label>
                    Услуга:
                    <select
                        value={selectService}
                        onChange={(e) => setSelectService(e.target.value)}
                    >
                        <option value="">Выберите услугу</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Дата:
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label>
                    Время:
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                        {timeSlots.map((slot, index) => (
                            <option key={index} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Врач:
                    <select
                        value={selectDoctor || ''}
                        onChange={(e) => setSelectDoctor(e.target.value)}
                    >
                        <option value="">Выберите врача</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.fullName}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Кабинет: {room}
                </label>
                <button onClick={addAppointment}>Записать</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};

export default AppointmentForm;