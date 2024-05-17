import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Doctor from './doctorsM';
import Prosthetic from './prostheticsM';

class Order extends Model {
    public id!: number;
    public order_name!: string;
    public price!: number;
    public count!: number;
    public date!: Date;
    public status!: 'Создан' | 'В пути' | 'Получен' | 'Отменен';
    public doctors_id!: number;
    public prosthetics_id!: number;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Создан', 'В пути', 'Получен', 'Отменен'),
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
        prosthetics_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Prosthetic,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: false,
    }
);

export default Order;