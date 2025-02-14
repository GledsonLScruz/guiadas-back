import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Course from './course';

// Defina os atributos do modelo

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    startSemester: string;
    enrolledCourseId: string;
}

// Cria a interface para os atributos necessários na criação,
// tornando o campo 'id' opcional (pois será gerado automaticamente)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements
    UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public startSemester!: string;
    public enrolledCourseId!: string;
}

// Inicialize o modelo com os campos no banco

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startSemester: {
            type: DataTypes.STRING,
        },
        enrolledCourseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Course,
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        }
    },
    {
        sequelize,
        tableName: "users",
        timestamps: false,
    }
);