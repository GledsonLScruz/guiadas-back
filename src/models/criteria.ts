import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Evaluation } from './evaluation';

export interface CriteriaAttributes {
    id: Number;
    grade: Number;
    comment: String;
    name: String;
    evaluationId: Number;
}

export interface CriteariaCreationAttributes extends Optional<CriteriaAttributes, 'id'> { }

export class Criteria extends Model<CriteriaAttributes, CriteariaCreationAttributes> implements CriteriaAttributes {
    public id!: Number;
    public grade!: Number;
    public comment!: String;
    public name!: String;
    public evaluationId!: Number;
}

Criteria.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        grade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        evaluationId: {
            type: DataTypes.INTEGER,
            references: {
                model: Evaluation,
                key: 'id'
            }
        }
    }, {
    sequelize,
    tableName: 'criterias',
    timestamps: false,
}
);


