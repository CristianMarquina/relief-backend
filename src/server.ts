import express from "express";
import { sequelize, conn } from "./db";
import cors from "cors";
import { router } from "./index.routes";

const app = express();
const PORT = 3000;
app.use(cors());
app.use("/api/v1", router);
const startServer = async () => {
  await conn();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
