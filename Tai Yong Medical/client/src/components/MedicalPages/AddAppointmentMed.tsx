import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../assets/AddAppointmentMed.module.css';
import { IClient } from '../types/IClient';
import AppointmentForm from './AppointmentForm';

const AddAppointmentMed = () => {
    const [clients, setClients] = useState<IClient[]>([]);
    const [filterClients, setFilterClients] = useState<IClient[]>([]);
    const [selectClient, setSelectClient] = useState<IClient | null>(null);
    const [services, setServices] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:4200/client/clients');
                setClients(response.data);
                setFilterClients(response.data); // Initialize filtered clients
            } catch (error) {
                console.error('Ошибка при получении списка клиентов:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:4200/service/services');
                setServices(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка услуг:', error);
            }
        };

        fetchClients();
        fetchServices();
    }, []);

    const ClientSelect = (client: IClient) => {
        setSelectClient(client);
        setIsFormOpen(true);
    };

    const CloseForm = () => {
        setSelectClient(null);
        setIsFormOpen(false);
    };

    const Search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filtered = clients.filter((client) => {
            const fullName = `${client.Name} ${client.surName} ${client.lastName}`;
            return fullName.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilterClients(filtered);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Список клиентов:</h1>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Поиск клиента"
                    value={search}
                    onChange={Search}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.patientList}>
                <ul>
                    {filterClients.map((client) => (
                        <li key={client.id} onClick={() => ClientSelect(client)}>
                            {client.Name} {client.surName} {client.lastName}
                        </li>
                    ))}
                </ul>
            </div>
            {selectClient && isFormOpen && (
                <AppointmentForm client={selectClient} onClose={CloseForm} />
            )}
        </div>
    );
};

export default AddAppointmentMed;