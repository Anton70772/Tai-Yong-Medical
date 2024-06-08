import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../assets/Appointments.module.css';
import { IAppointment } from '../types/IAppointment';

const Appointments = () => {
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshToken = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:4200/client/refresh-token', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            localStorage.setItem('token', response.data.token);
            return response.data.token;
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            let token = localStorage.getItem('token');
            if (!token) {
                setError('Необходима авторизация');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:4200/appointments/doctor', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                setAppointments(response.data);
            } catch (err) {
                console.error('Ошибка при получении записей:', err);
                if (err.response.status === 401 && err.response.data.error === 'Токен не найден') {
                    token = await refreshToken();
                    if (token) {
                        const response = await axios.get('http://localhost:4200/appointments/doctor', {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });

                        setAppointments(response.data);
                    } else {
                        setError('Ошибка при обновлении токена');
                    }
                } else {
                    setError('Ошибка при получении записей');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const CheckStatus = (id: number, newStatus: string) => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.id === id ? { ...appointment, status: newStatus } : appointment
            )
        );
    };

    const SaveStatus = async (id: number, newStatus: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Необходима авторизация');
            return;
        }

        try {
            await axios.put(`http://localhost:4200/appointments/appointments/${id}`, { status: newStatus }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setError(null);
        } catch (err) {
            console.error('Ошибка при изменении статуса:', err);
            setError('Ошибка при изменении статуса');
        }
    };

    if (loading) {
        return <div>Подождите, загружается...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.appointmentsContainer}>
            <h1 className={styles.tittle}>Записи</h1>
            <table className={styles.appointmentsTable}>
                <thead>
                    <tr>
                        <th>Дата и время</th>
                        <th>Кабинет</th>
                        <th>Статус</th>
                        <th>Клиент</th>
                        <th>Услуга</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{new Date(appointment.dateTime).toLocaleString()}</td>
                            <td>{appointment.room}</td>
                            <td>
                                <select
                                    value={appointment.status}
                                    onChange={(e) => CheckStatus(appointment.id, e.target.value)}
                                >
                                    <option value="Запись назначена">Запись назначена</option>
                                    <option value="Запись отменена">Запись отменена</option>
                                    <option value="Прием завершен">Прием завершен</option>
                                </select>
                            </td>
                            <td>{`${appointment.Client.surName} ${appointment.Client.Name} ${appointment.Client.lastName}`}</td>
                            <td>{appointment.Service.name}</td>
                            <td>
                                <button onClick={() => SaveStatus(appointment.id, appointment.status)}>
                                    Сохранить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Appointments;