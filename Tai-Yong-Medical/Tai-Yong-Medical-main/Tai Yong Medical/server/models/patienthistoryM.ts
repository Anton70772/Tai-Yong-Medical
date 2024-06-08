import { DataTypes, Model, BelongsToGetAssociationMixin } from 'sequelize';
import sequelize from '../db';
import Client from './clientM';

class PatientHistory extends Model {
    public id!: number;
    public description!: string;
    public date!: Date;
    public state!: string;
    public patients_id!: number;

    public getClientInfo!: BelongsToGetAssociationMixin<Client | null>
}

PatientHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(45),
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
    },
    {
        sequelize,
        modelName: 'PatientHistory',
        tableName: 'patienthistory',
        timestamps: false,
    }
);

PatientHistory.prototype.getClientInfo = async function () {
    const client = await Client.findByPk(this.patients_id);
    return client;
};

export default PatientHistory;