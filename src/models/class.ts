import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Course from './course';
import Professor from './professor';

interface ClassAttributes {
    id: number; // Unique identifying number
    name: string;  // Class name
    semester: string; // Year and semester in which the class was taught
    courseId: number; // Identifies the Class's primary course
    professorId: number; // Identifies the Class's primary professor
}

export interface ClassCreationAttributes extends Optional<ClassAttributes, 'id'> { }

export class Class extends Model<ClassAttributes, ClassCreationAttributes> implements
    ClassAttributes {
    public id!: number;
    public name!: string;
    public semester!: string;
    public courseId!: number;
    public professorId!: number;
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
        professorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Professor,
                key: 'id',
            }
        }
    },
    {
        sequelize,
        tableName: 'classes',
        timestamps: false,
    }
);
