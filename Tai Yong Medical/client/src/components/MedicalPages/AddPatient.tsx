import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../assets/AddPatient.module.css';

const AddPatient = () => {
    const [klient, setKlient] = useState({
        Name: '',
        surName: '',
        lastName: '',
        birthday: '',
        gender: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setKlient({
            ...klient,
            [name]: value
        });
    };

    useEffect(() => {
        axios.get('http://localhost:4200/client/clients')
            .then(response => setKlient(response.data))
            .catch(error => console.error('Ошибка при получении данных:', error));
    }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('/api/createClient', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(klient)
    //         });

    //         if (response.ok) {
    //             console.log('Клиент успешно создан');
    //         } else {
    //             console.error('Ошибка при создании клиента');
    //         }
    //     } catch (error) {
    //         console.error('Ошибка при отправке запроса на создание клиента', error);
    //     }
    // };

    return (
        <div className={styles.formContainer}>
            <h2>Регистрация нового клиента</h2>
            <form>
                <input type="text" name="Name" placeholder="Имя" onChange={handleChange} />
                <input type="text" name="surName" placeholder="Фамилия" onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Отчество" onChange={handleChange} />
                <input type="text" name="birthday" placeholder="Дата рождения" onChange={handleChange} />
                <input type="text" name="gender" placeholder="Пол" onChange={handleChange} />
                <input type="text" name="phone" placeholder="Телефон" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Пароль" onChange={handleChange} />
                <button type="submit">Зарегистрировать клиента</button>
            </form>
        </div>
    );
};

export default AddPatient;