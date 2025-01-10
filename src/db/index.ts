import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_URL,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  logging: false, // Opcional: desactiva logs SQL
});

export const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.error("Error al conectar la base de datos:", error);
    process.exit(1);
  }
};
