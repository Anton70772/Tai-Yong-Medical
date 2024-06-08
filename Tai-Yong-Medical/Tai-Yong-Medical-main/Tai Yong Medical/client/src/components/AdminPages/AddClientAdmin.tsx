import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../assets/AddPatient.module.css';
import { IProfile } from '../types/IProfile';
import ClientList from '../MedicalPages/ClientList';
import AddAdminClientForm from './AddAdminClientForm';

const AddClientAdmin = () => {
    const [clients, setClients] = useState<IProfile[]>([]);
    const [ModalOpen, setModalOpen] = useState(false);

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
        setModalOpen(true);
    };

    const CloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.container}>
            <ClientList clients={clients} />
            <button onClick={OpenModal} className={styles.addButton}>Добавить нового клиента</button>
            {ModalOpen && <AddAdminClientForm onClose={CloseModal} onAddClient={AddClient} />}
        </div>
    );
};

export default AddClientAdmin;