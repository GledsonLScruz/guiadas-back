
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// Define the attributes for the user admin model
interface UserAdminAttributes {
  id: number;
  email: string;
  name: string;
  password: string;
}

// Define the creation attributes making id optional (auto-incremented)
export interface UserAdminCreationAttributes extends Optional<UserAdminAttributes, 'id'> { }

// Create the UserAdmin model class
export class UserAdmin extends Model<UserAdminAttributes, UserAdminCreationAttributes> implements UserAdminAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public password!: string;
}

// Initialize the model with its attributes
UserAdmin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'userAdmins',
    timestamps: false, // Adjust if you want timestamps
  }
);
