import { Sequelize } from "sequelize-typescript";
import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";
dotenv.config();

/**
 * Pool de conexiones para la base de datos.
 * @type {pg.Pool}
 */
export const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_URL,
  database: process.env.DB_NAME,
  password: process.env.DB_PWD,
  port: process.env.DB_PORT,
});

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_URL,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  logging: false,
});

/**
 * Asynchronous function to verify and obtain a database connection.
 * @async
 * @returns {Promise<pg.PoolClient | null>} Returns the connection client if the connection is successful, or `null` if it fails.
 */
export const conn = async () => {
  try {
    const client = await db.connect();
    console.log(`[SERVER]: Database connected successfully yes yes`);
    return client;
  } catch (error) {
    console.error(`[ERROR]: Failed to connect to database`);
    console.error(error);
    return null;
  }
};

export default conn;
