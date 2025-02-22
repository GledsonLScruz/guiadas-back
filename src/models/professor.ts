import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the Professor model
interface ProfessorAttributes {
    id: number;
    name: string;
}

// Create an interface for creation attributes, making 'id' optional
export interface ProfessorCreationAttributes extends Optional<ProfessorAttributes, 'id'> { }

export class Professor extends Model<ProfessorAttributes, ProfessorCreationAttributes> implements ProfessorAttributes {
    public id!: number; // Unique identifying number
    public name!: string; // Given name of a Professor
}

// Initialize the model with database fields
Professor.init(
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
    },
    {
        sequelize,
        tableName: "professors",
        timestamps: false,
    }
);

export default Professor;