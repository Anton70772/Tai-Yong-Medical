import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../assets/AddAppointment.module.css';
import { Doctor } from '../types/IDoctor';
import { IAppointment } from '../types/IAppointment';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from 'jwt-decode';

const AddAppointment: React.FC<IAppointment> = ({ service, onClose }) => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('09:00');
    const [room] = useState<number>(Math.floor(Math.random() * 25) + 101);

    useEffect(() => {
        axios.get('http://localhost:4200/doctor/doctors')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Ошибка при получении данных:', error));
    }, []);

    const addAppointment = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Токен не найден');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded: JwtPayload = jwtDecode(token);
                console.log('Декодированный токен:', decoded);

                const clients_id = decoded.clientId;
                console.log('ID клиента:', clients_id);

                const dateTime = `${date}T${time}`;

                const data = {
                    dateTime,
                    room,
                    status: 'Запись назначена',
                    clients_id,
                    doctors_id: selectedDoctor,
                    services_id: service.id,
                };

                console.log('Отправляемые данные:', data);      

                axios.post('http://localhost:4200/appointments/appointments', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        console.log('Полученные данные:', response.data);
                        console.log('Запись успешно создана:', response.data);
                        onClose();
                    })
                    .catch(error => console.error('Ошибка при создании записи:', error));
            } else {
                console.error('Токен отсутствует в localStorage');
            }
        } catch (error) {
            console.error('Ошибка при декодировании токена или запросе:', error);
        }
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
                <p>Услуга: {service.name}</p>
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
                        value={selectedDoctor || ''}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
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
                <button onClick={addAppointment}>Записаться</button>
                <button onClick={onClose}>Отмена</button>
            </div>
        </div>
    );
};

export default AddAppointment;