import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Course from './course';

interface ClassAttributes {
    id: number;
    name: string;
    semester: string;
    courseId: number;
}

export interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> { }

export class Class extends Model<ClassAttributes, ClassCreationAttributes> implements
    ClassAttributes {
    public id!: number;
    public name!: string;
    public semester!: string;
    public courseId!: number;
}

Class.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Course,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'classes',
        timestamps: false,
    }
);
