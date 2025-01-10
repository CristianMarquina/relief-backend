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
 * Interface defining the attributes of the Bookmark model.
 */
interface BookmarkAttributes {
  id: string;
  historyid: string;
  is_deleted?: boolean;
  createdAt: Date;
  deleteAt?: Date;
}
/**
 * Interface for creating a new Bookmark entry.
 * Makes the 'id' field optional since it is auto-generated.
 */
interface BookmarkCreationAttributes
  extends Optional<BookmarkAttributes, "id"> {}
/**
 * Bookmark model class for the 'histories' table in the database.
 */
export class Bookmark extends Model {
  public id!: number;
  public historyid!: string;
  public is_deleted?: boolean;
  public readonly createdAt!: Date;
  public deleteAt?: Date;
}
/**
 * Initialize the Bookmark model with its attributes and configuration options.
 */
Bookmark.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      comment: "Unique identifier for each Bookmark",
    },
    historyid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "histories",
        key: "id",
      },
      comment: "Foreign key referencing the histories table",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      comment: "Logical deletion flag for the Bookmark, used for soft deletes",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: "Timestamp of when the Bookmark was created",
    },
    deleteAt: {
      type: DataTypes.DATE,
      comment: "Timestamp of when the Bookmark was deleted",
    },
  },
  {
    sequelize,
    tableName: "bookmarks",
    timestamps: true,
  }
);

export default Bookmark;
