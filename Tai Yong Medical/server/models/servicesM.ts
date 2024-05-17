import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Doctor from './doctorsM';

class Service extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public required_documents!: string;
    public doctors_id!: number;
}

Service.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                isDecimal: true,
                min: 0,
            },
        },
        required_documents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        doctors_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'doctors',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Service',
        tableName: 'services',
        timestamps: false,
    }
);

Service.belongsTo(Doctor, { foreignKey: 'doctors_id' });

export default Service;