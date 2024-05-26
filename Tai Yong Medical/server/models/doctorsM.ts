import { DataTypes, Model } from 'sequelize';
import sequelize  from '../db';

class Doctor extends Model {
    public id!: number;
    public fullName!: string;
    public position!: string;
    public work_experience_start_day!: Date;
    public phone!: string;
    public photo!: string;
}

Doctor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
        position: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        work_experience_start_day: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        phone: {
            type: DataTypes.CHAR(12),
            allowNull: false,
            unique: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Doctor',
        tableName: 'doctors',
        timestamps: false,
    }
);

export default Doctor;