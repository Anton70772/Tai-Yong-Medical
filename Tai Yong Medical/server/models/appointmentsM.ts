import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Client from './clientM';
import Doctor from './doctorsM';
import Service from './servicesM';

class Appointment extends Model {
    public id!: number;
    public dateTime!: Date;
    public room!: number;
    public status!: 'Запись назначена' | 'Запись отменена' | 'Прием завершен';
    public clients_id!: number;
    public doctors_id!: number;
    public services_id!: number;
}

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        room: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Запись назначена', 'Запись отменена', 'Прием завершен'),
            allowNull: false,
        },
        clients_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: 'id',
            },
        },
        doctors_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Doctor,
                key: 'id',
            },
        },
        services_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Service,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Appointment',
        tableName: 'appointments',
        timestamps: false,
    }
);

export default Appointment;