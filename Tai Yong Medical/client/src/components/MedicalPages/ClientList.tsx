import React, { useState } from 'react';
import { IProfile } from '../types/IProfile';
import styles from '../../assets/AddPatient.module.css';

interface IClientList {
    clients: IProfile[];
}

const ClientList: React.FC<IClientList> = ({ clients, onClientSelect }) => {
    const [search, setSearch] = useState('');

    const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filterClients = clients.filter((client) => {
        const fullName = `${client.Name} ${client.surName} ${client.lastName} ${client.email}`;
        return fullName.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className={styles.clients}>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Поиск клиента"
                    value={search}
                    onChange={Search}
                    className={styles.searchInput}
                />
            </div>
            <h2 className={styles.title}>Список клиентов</h2>
            <ul className={styles.client_list}>
                {filterClients.map((client) => (
                    <li key={client.id} className={styles.clientItem} onClick={() => onClientSelect(client)}>
                        <span><strong>Имя:</strong> {client.Name}</span>
                        <span><strong>Фамилия:</strong> {client.surName}</span>
                        <span><strong>Отчество:</strong> {client.lastName}</span>
                        <span><strong>Email:</strong> {client.email}</span>
                        <span><strong>Номер телефона:</strong> {client.phone}</span>
                        <span><strong>Пароль:</strong> {client.password}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;