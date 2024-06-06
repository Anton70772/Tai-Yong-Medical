import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../assets/OrderingProsthesis.module.css';

interface Prosthetic {
    id: number;
    product_name: string;
    manufacturer: string;
    price: number;
    count: number;
    description: string;
    image: string;
}

const OrderingProsthesis = () => {
    const [prosthetics, setProsthetics] = useState<Prosthetic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProsthetics = async () => {
            try {
                const response = await axios.get<Prosthetic[]>('http://localhost:4200/prosthetic/prosthetics');
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
                                Цена: {typeof prosthetic.price === 'number' ? prosthetic.price.toFixed(2) : 'N/A'} руб.
                            </p>
                            <p className={styles.count}>Количество на складе: {prosthetic.count}</p>
                            <p className={styles.description}>{prosthetic.description}</p>
                            <button className={styles.orderButton}>Заказать</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderingProsthesis;