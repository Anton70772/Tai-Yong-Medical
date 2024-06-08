import React from 'react';
import Modal from 'react-modal';
import styles from '../../assets/OrderingProsthesis.module.css';
import { IOrder } from '../types/IOrder';

const OrderModal: React.FC<IOrder> = ({ isOpen, onRequestClose, orderData, onChange, onSubmit }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Заказ Протеза"
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2>Заказ Протеза</h2>
            <form onSubmit={onSubmit} className={styles.form}>
                <label>
                    Название заказа:
                    <input type="text" name="order_name" value={orderData.order_name} onChange={onChange} required readOnly />
                </label>
                <label>
                    Цена:
                    <input type="number" name="price" value={orderData.price} onChange={onChange} required readOnly />
                </label>
                <label>
                    Количество:
                    <input type="number" name="count" value={orderData.count} onChange={onChange} required />
                </label>
                <label>
                    Дата:
                    <input type="date" name="date" value={orderData.date} onChange={onChange} required />
                </label>
                <label>
                    Статус:
                    <input type="text" name="status" value={orderData.status} onChange={onChange} required readOnly />
                </label>
                <button type="submit">Отправить</button>
            </form>
        </Modal>
    );
};

export default OrderModal;