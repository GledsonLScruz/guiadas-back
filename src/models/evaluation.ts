import { CriteriaAttributes } from './criteria';
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './user';
import { Professor } from './professor';
import { Class } from './class';
import { timeStamp } from 'console';

interface EvaluationAttributes {
    id: number;
    userId: Number;
    professorId: Number;
    classId: Number;
    semester: String;
}

export interface EvaluationCreationAttributes extends Optional<EvaluationAttributes, 'id'> { }

export class Evaluation extends Model<EvaluationAttributes, EvaluationCreationAttributes> implements EvaluationAttributes {
    public id!: number;
    public userId!: Number;
    public professorId!: Number;
    public classId!: Number;
    public semester!: String;
}

Evaluation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        professorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Professor,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Class,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    sequelize,
    tableName: "evaluations",
    timestamps: true,
}
);