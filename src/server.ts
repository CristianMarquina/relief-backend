import express from "express";
import { sequelize, testDatabaseConnection } from "./db";

const app = express();
const PORT = 3000;

const startServer = async () => {
  await testDatabaseConnection();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
