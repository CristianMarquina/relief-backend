import express from "express";
import { sequelize, conn } from "./db";
import cors from "cors";
import { router } from "./index.routes";
import { setupAssociations } from "./modules/bookmark/models/associations";

const app = express();
const PORT = 8000;
// Apply middlewares before routes
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON
app.use(express.urlencoded({ extended: false })); // Middleware for parsing URL-encoded data

app.use("/api/v1", router);
setupAssociations();
const startServer = async () => {
  await conn();

  app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
  });
};

startServer();
