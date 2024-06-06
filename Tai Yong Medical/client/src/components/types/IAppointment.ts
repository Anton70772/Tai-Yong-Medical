import { IServices } from './IService';
import { IClient } from './IClient';

export interface IAppointment {
    service: IServices;
    onClose: () => void;

    id: number;
    dateTime: string;
    room: number;
    status: string;
    Client: IClient;
    Service: IServices;
}