import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the Course model
interface CourseAttributes {
    id: number; // Unique identifying number
    name: string; // Course denomination
}

// Create an interface for creation attributes, making 'id' optional
export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> { }

export class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
    public id!: number;
    public name!: string;
}

// Initialize the model with database fields
Course.init(
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
        tableName: "courses",
        timestamps: false,
    }
);

export default Course;
