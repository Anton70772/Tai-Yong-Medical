import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Client extends Model {
    public id!: number;
    public Name!: string;
    public surName!: string;
    public lastName!: string;
    public birthday!: string;
    public gender!: string;
    public phone!: string;
    public email!: string;
    public password!: string;
    // public Role!: string;
}

Client.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Role: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     defaultValue: 'User',
        // },
    },
    {
        sequelize,
        modelName: 'Client',
        tableName: 'clients',
        timestamps: false,
    }
);

export default Client;