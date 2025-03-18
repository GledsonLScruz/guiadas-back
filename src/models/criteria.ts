import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Evaluation } from './evaluation';

export interface CriteriaAttributes {
    id: number;
    grade: Number;
    comment: String;
    name: String;
    evaluationId: Number;
}

export interface CriteariaCreationAttributes extends Optional<CriteriaAttributes, 'id'> { }

export class Criteria extends Model<CriteriaAttributes, CriteariaCreationAttributes> implements CriteriaAttributes {
    public id!: number; // Unique identifying number
    public grade!: Number; // Value varying from 0 to 5
    public comment!: String; // Further explanation on the chosen grade. Optional, limit of 500 characters
    public name!: String; // Evaluated criterion, chosen from the criteriaTypes enumeration (model)
    public evaluationId!: Number; // identifies the Evaluation it is associated to
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
