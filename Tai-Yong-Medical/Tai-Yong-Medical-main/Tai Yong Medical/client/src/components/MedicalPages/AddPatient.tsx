import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../assets/AddPatient.module.css';
import { IProfile } from '../types/IProfile';
import ClientList from './ClientList';
import AddClientForm from './AddClientForm';

const AddPatient = () => {
    const [clients, setClients] = useState<IProfile[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:4200/client/clients');
                setClients(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка клиентов', error);
            }
        };

        fetchClients();
    }, []);

    const AddClient = (newClient: IProfile) => {
        setClients(prevClients => [...prevClients, newClient]);
    };

    const OpenModal = () => {
        setIsModalOpen(true);
    };

    const CloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <ClientList clients={clients} />
            <button onClick={OpenModal} className={styles.addButton}>Добавить нового клиента</button>
            {isModalOpen && <AddClientForm onClose={CloseModal} onAddClient={AddClient} />}
        </div>
    );
};

export default AddPatient;