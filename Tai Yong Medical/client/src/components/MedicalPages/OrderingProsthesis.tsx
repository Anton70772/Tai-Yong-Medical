import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../assets/OrderingProsthesis.module.css';
import { IProsthetic } from '../types/IProsthetic';
import OrderModal from './OrderModal';

const OrderingProsthesis = () => {
    const [prosthetics, setProsthetics] = useState<IProsthetic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [orderData, setOrderData] = useState({
        order_name: '',
        price: '',
        count: 1,
        date: '',
        status: 'Создан',
        doctors_id: '',
        prosthetics_id: '',
    });

    useEffect(() => {
        const fetchProsthetics = async () => {
            try {
                const response = await axios.get<IProsthetic[]>('http://localhost:4200/prosthetic/prosthetics');
                const data = response.data.map((item) => ({
                    ...item,
                    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                    count: item.count !== null ? item.count : 0,
                }));
                setProsthetics(data);
            } catch (err) {
                console.error('Ошибка при получении протезов:', err);
                setError('Ошибка при получении протезов');
            } finally {
                setLoading(false);
            }
        };

        fetchProsthetics();
    }, []);

    const parseJwt = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    };

    const addOrder = (prosthetic: IProsthetic) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found');
            return;
        }

        const decodedToken = parseJwt(token);
        if (!decodedToken) {
            console.error('Failed to decode token');
            return;
        }

        const doctors_id = decodedToken.doctorId;

        setOrderData({
            ...orderData,
            order_name: prosthetic.product_name,
            price: prosthetic.price.toString(),
            doctors_id,
            prosthetics_id: prosthetic.id.toString(),
            date: new Date().toISOString().split('T')[0],
        });
        setModalOpen(true);
    };

    const InputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrderData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4200/order/orders', orderData);
            setModalOpen(false);
            alert('Заказ успешно создан!');
        } catch (err) {
            console.error('Ошибка при создании заказа:', err);
            alert('Ошибка при создании заказа');
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={styles.prostheticsContainer}>
            <h1 className={styles.title}>Заказать Протез</h1>
            <div className={styles.prostheticsList}>
                {prosthetics.map((prosthetic) => (
                    <div key={prosthetic.id} className={styles.prostheticCard}>
                        <img
                            src={`http://localhost:4200${prosthetic.image}`}
                            alt={prosthetic.product_name}
                            className={styles.prostheticImage}
                        />
                        <div className={styles.prostheticInfo}>
                            <h2 className={styles.productName}>{prosthetic.product_name}</h2>
                            <p className={styles.manufacturer}>Производитель: {prosthetic.manufacturer}</p>
                            <p className={styles.price}>
                                Цена: {typeof prosthetic.price === 'number' ? prosthetic.price.toFixed(2) : 'N/A'} $
                            </p>
                            <p className={styles.count}>Количество на складе: {prosthetic.count}</p>
                            <p className={styles.description}>{prosthetic.description}</p>
                            <button className={styles.orderButton} onClick={() => addOrder(prosthetic)}>Заказать</button>
                        </div>
                    </div>
                ))}
            </div>
            <OrderModal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                orderData={orderData}
                onChange={InputChange}
                onSubmit={onSubmit}
            />
        </div>
    );
};

export default OrderingProsthesis;