import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import '../../assets/auth.css';
import { IAuth } from '../types/IAuth';

const Auth = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<IAuth>({
        mode: 'onChange',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, []);

    const onSubmit = async (data: IAuth) => {
        try {
            const response = await axios.post('http://localhost:4200/client/login', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                console.log('Авторизация успешна!');
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                console.log('Ошибка при авторизации');
                console.error('Ошибка:', response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Ошибка при отправке данных:', error.response?.data.message || error.message);
            } else {
                console.error('Неизвестная ошибка:', error);
            }
        }
    };

    return (
        <div className="container">
            <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
                <label className='form-container__label'>
                    Электронная почта (Email):
                    <input
                        type="email"
                        {...register("email", {
                            required: 'Email обязателен',
                            pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: 'Неверный формат email'
                            }
                        })}
                        autoComplete='off'
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                </label>

                <label className='form-container__label'>
                    Пароль:
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Пароль обязателен',
                            minLength: { value: 1, message: 'Минимальная длина пароля 8 символов' },
                            maxLength: { value: 16, message: 'Максимальная длина пароля 16 символов' }
                        })}
                        autoComplete='off'
                    />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </label>

                <button className='reg-button' type="submit" disabled={!isValid}>Войти</button>
                <div className='ili'>Или</div>
                <Link to={`/registration`} className="enter-button">Зарегистрироваться</Link>
            </form>
        </div>
    );
}

export default Auth;