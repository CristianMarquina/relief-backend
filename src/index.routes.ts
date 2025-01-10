import express from "express";
import historiesRouter from "./modules/history/routes/histories.routes";

const router = express.Router();

router.use("/history", historiesRouter);

export { router };
