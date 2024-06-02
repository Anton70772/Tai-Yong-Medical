import { IServices } from './IService';

export interface IAppointment {
    service: IServices;
    onClose: () => void;
}