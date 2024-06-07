import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styles from '../../assets/AddPatient.module.css';

interface AddClientFormProps {
    onClose: () => void;
    onAddClient: (newClient: any) => void;
}

const AddAdminClientForm: React.FC<AddClientFormProps> = ({ onClose, onAddClient }) => {
    const [formData, setFormData] = useState({
        Name: '',
        surName: '',
        lastName: '',
        birthday: '',
        // gender: '',
        phone: '',
        email: '',
        password: ''
    });

    useState();

    const addClient = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Отправляемые данные:', formData);
        try {
            const response = await axios.post('http://localhost:4200/client/clients', formData);
            console.log('Ответ от сервера:', response);

            if (response.status === 201 || response.status === 200) {
                const newClient = response.data;
                onAddClient(newClient);
                setFormData({
                    Name: '',
                    surName: '',
                    lastName: '',
                    birthday: '',
                    // gender: '',
                    phone: '',
                    email: '',
                    password: ''
                });
                onClose();
            } else {
                console.error('Ошибка при создании клиента');
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса на создание клиента', error);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>Добавление нового клиента</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input type="text" name="Name" placeholder="Имя" onChange={addClient} value={formData.Name} />
                    <input type="text" name="surName" placeholder="Фамилия" onChange={addClient} value={formData.surName} />
                    <input type="text" name="lastName" placeholder="Отчество" onChange={addClient} value={formData.lastName} />
                    <input type="date" name="birthday" placeholder="Дата рождения" onChange={addClient} value={formData.birthday} />
                    {/* <input type="text" name="gender" placeholder="Пол" onChange={addClient} value={formData.gender} /> */}
                    <input type="text" name="phone" placeholder="Телефон" onChange={addClient} value={formData.phone} />
                    <input type="email" name="email" placeholder="Email" onChange={addClient} value={formData.email} />
                    <input type="password" name="password" placeholder="Пароль" onChange={addClient} value={formData.password} />
                    <button type="submit">Добавить клиента</button>
                </form>
            </div>
        </div>
    );
};

export default AddAdminClientForm;