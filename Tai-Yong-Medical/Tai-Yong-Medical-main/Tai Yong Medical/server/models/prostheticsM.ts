import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Prosthetic extends Model {
    public id!: number;
    public product_name!: string;
    public manufacturer!: string;
    public price!: number;
    public count!: number | null;
    public description!: string;
    public image!: string;
}

Prosthetic.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        manufacturer: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },        
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Prosthetic',
        tableName: 'prosthetics',
        timestamps: false,
    }
);

export default Prosthetic;