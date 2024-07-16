import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IAuth } from '../types/IAuth';
import '../../assets/auth.css';

const Reg = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IAuth>({ mode: 'onChange' });
    const navigate = useNavigate();

    const onSubmit = async (data: IAuth) => {
        try {
            const response = await axios.post('http://localhost:4200/client/clients', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {
                navigate('/authorization');
                console.log('Регистрация успешна!');
            } else {
                console.log('Ошибка при регистрации');
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
                    Фамилия:
                    <input
                        type="text"
                        {...register('surName', {
                            required: true,
                            maxLength: { value: 50, message: 'Максимальная длина 50 символов' }
                        })}
                        autoComplete='off'
                    />
                    {errors.surName && <span className="error-message">{errors.surName.message}</span>}
                </label>

                <label className='form-container__label'>
                    Имя:
                    <input
                        type="text"
                        {...register('Name', {
                            required: 'Поле обязательно для заполнения',
                            maxLength: { value: 15, message: 'Максимальная длина 15 символов' }
                        })}
                        autoComplete='off'
                    />
                    {errors.Name && <span className="error-message">{errors.Name.message}</span>}
                </label>

                <label className='form-container__label'>
                    Отчество:
                    <input
                        type="text"
                        {...register('lastName', {
                            maxLength: { value: 15, message: 'Максимальная длина 15 символов' }
                        })}
                        autoComplete='off'
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                </label>

                <label className='form-container__label'>
                    Дата рождения:
                    <input
                        type="date"
                        {...register('birthday', {
                            required: 'Дата рождения обязательна',
                            validate: {
                                validDate: value => !isNaN(Date.parse(value)) || 'Неверная дата'
                            }
                        })}
                        autoComplete='off'
                    />
                    {errors.birthday && <span className="error-message">{errors.birthday.message}</span>}
                </label>

                {/* <label className='form-container__label'>
                    Пол:
                    <select {...register('gender', { required: 'Пол обязателен' })}>
                        <option value="">Выберите пол</option>
                        <option value="male">Мужской</option>
                        <option value="female">Женский</option>
                    </select>
                    {errors.gender && <span className="error-message">{errors.gender.message}</span>}
                </label> */}

                <label className='form-container__label'>
                    Номер телефона:
                    <input
                        type="tel"
                        {...register('phone', {
                            required: 'Номер телефона обязателен',
                            pattern: {
                                value: /^\+?[1-9]\d{1,14}$/,
                                message: 'Неверный формат номера телефона'
                            }
                        })}
                        autoComplete='off'
                    />
                    {errors.phone && <span className="error-message">{errors.phone.message}</span>}
                </label>

                <label className='form-container__label'>
                    Email:
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email обязателен',
                            maxLength: { value: 16, message: 'Макисмальная длина email 16 символов' },
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
                            minLength: { value: 6, message: 'Минимальная длина пароля 8 символов' },
                            maxLength: { value: 16, message: 'Макисмальная длина пароля 16 символов' }
                        })}
                        autoComplete='off'
                    />
                    {errors.password && <span className="error-message">{errors.password.message}</span>}
                </label>

                <button className='reg-button' type="submit">Зарегистрироваться</button>
                <div className='ili'>Или</div>
                <Link to={`/authorization`} className="enter-button">Войти</Link>
            </form>
        </div>
    );
}

export default Reg;