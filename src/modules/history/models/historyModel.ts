import { DataTypes, Model, Optional } from "sequelize";

import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

/**
 * Initializes a Sequelize instance to connect to the PostgreSQL database.
 * Configures database connection parameters, including connection pooling.
 */

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  host: process.env.DB_URL,
  port: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: false,
  },
  logging: false,
});

/**
 * Interface defining the attributes of the History model.
 */
interface HistoryAttributes {
  id: string;
  name: string;
  url: string;
  is_deleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deleteAt?: Date;
}
/**
 * Interface for creating a new History entry.
 * Makes the 'id' field optional since it is auto-generated.
 */
interface HistoryCreationAttributes extends Optional<HistoryAttributes, "id"> {}
/**
 * History model class for the 'histories' table in the database.
 */
export class History extends Model {
  public id!: number;
  public url!: string;
  public name!: string;
  public is_deleted?: boolean;
  public readonly createdAt!: Date;
  public updatedAt!: Date;
  public deleteAt?: Date;
}
/**
 * Initialize the History model with its attributes and configuration options.
 */
History.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for each History",
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255],
      },
      comment: "url of the history",
    },

    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        len: [1, 64],
      },
      comment: "Name of the History, must be between 1 and 64 characters",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      comment: "Logical deletion flag for the History, used for soft deletes",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "Timestamp of when the History was created",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "Timestamp of the last update of the History",
    },
    deleteAt: {
      type: DataTypes.DATE,
      comment: "Timestamp of when the History was deleted",
    },
  },
  {
    sequelize,
    tableName: "histories",
    timestamps: true,
  }
);

export default History;
