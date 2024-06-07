import { useEffect, useState } from 'react';
import axios from 'axios';
import { Doctor } from '../types/IDoctor';
import styles from '../../assets/AdminSpecialists.module.css';

const AdminSpecialists = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        position: '',
        work_experience_start_day: '',
        phone: '',
        photo: null,
        email: '',
        password: '',
    });

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:4200/doctor/doctors');
            if (Array.isArray(response.data)) {
                setDoctors(response.data);
            } else {
                console.error('Ошибка данных:', response.data);
            }
        } catch (error) {
            console.error('Ошибка при загрузке списка докторов:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({
            ...formData,
            photo: file,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        form.append('fullName', formData.fullName);
        form.append('position', formData.position);
        form.append('work_experience_start_day', formData.work_experience_start_day);
        form.append('phone', formData.phone);
        form.append('email', formData.email);
        form.append('password', formData.password);
        if (formData.photo) {
            form.append('photo', formData.photo);
        }

        try {
            if (selectedDoctor) {
                await axios.put(`http://localhost:4200/doctor/doctors/${selectedDoctor.id}`, form);
            } else {
                await axios.post('http://localhost:4200/doctor/doctors', form);
            }
            fetchDoctors();
            resetForm();
        } catch (error) {
            console.error('Ошибка при сохранении данных доктора:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:4200/doctor/doctors/${id}`);
            fetchDoctors();
        } catch (error) {
            console.error('Ошибка при удалении доктора:', error);
        }
    };

    const handleEdit = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setFormData({
            fullName: doctor.fullName,
            position: doctor.position,
            work_experience_start_day: doctor.work_experience_start_day,
            phone: doctor.phone,
            photo: null,
            email: doctor.email,
            password: doctor.password,
        });
        setFormVisible(true);
    };

    const resetForm = () => {
        setSelectedDoctor(null);
        setFormData({
            fullName: '',
            position: '',
            work_experience_start_day: '',
            phone: '',
            photo: null,
            email: '',
            password: '',
        });
        setFormVisible(false);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Наши специалисты</h1>
            <button onClick={() => setFormVisible(true)} className={styles.addButton}>Добавить специалиста</button>
            <div className={styles.cards}>
                {doctors.map((doctor) => (
                    <div key={doctor.id} className={styles.card}>
                        <img src={`http://localhost:4200${doctor.photo}`} alt={doctor.fullName} className={styles.card__photo} />
                        <h2 className={styles.card__name}>{doctor.fullName}</h2>
                        <p className={styles.card__description}>{doctor.position}</p>
                        <button onClick={() => handleEdit(doctor)} className={styles.editButton}>Редактировать</button>
                        <button onClick={() => handleDelete(doctor.id)} className={styles.deleteButton}>Удалить</button>
                    </div>
                ))}
            </div>
            {formVisible && (
                <div className={styles.modal}>
                    <div className={styles.overlay} onClick={resetForm}></div>
                    <div className={styles.modalContent}>
                        <button className={styles.closeButton} onClick={resetForm}>×</button>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Полное имя:
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Должность:
                                <input
                                    type="text"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Дата начала работы:
                                <input
                                    type="date"
                                    name="work_experience_start_day"
                                    value={formData.work_experience_start_day}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Телефон:
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Пароль:
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Фото:
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <button type="submit" className={styles.saveButton}>
                                {selectedDoctor ? 'Сохранить изменения' : 'Добавить специалиста'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminSpecialists;