import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Doctor from './doctorsM';
import Service from './servicesM';

class ServicesReport extends Model {
    public id!: number;
    public date!: Date;
    public services!: string;
    public notes!: string;
    public doctors_id!: number;
    public services_id!: number;
}

ServicesReport.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        services: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        notes: {
            type: DataTypes.STRING(255),
            allowNull: false,
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
        modelName: 'ServicesReport',
        tableName: 'services_reports',
        timestamps: false,
    }
);

export default ServicesReport;