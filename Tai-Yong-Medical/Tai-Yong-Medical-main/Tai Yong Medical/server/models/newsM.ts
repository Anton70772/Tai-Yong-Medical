import { DataTypes, Model } from 'sequelize';
import sequelize  from '../db';

class News extends Model {
    public id!: number;
    public title!: string;
    public subTitle!: string;
    public picture!: string;
}

News.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        subTitle: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING(155),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'News',
        tableName: 'news',
        timestamps: false,
    }
);

export default News;