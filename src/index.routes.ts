import express from "express";
import historiesRouter from "./modules/history/routes/histories.routes";
import bookmarksRouter from "./modules/bookmark/routes/histories.routes";

const router = express.Router();

router.use("/history", historiesRouter);
router.use("/bookmark", bookmarksRouter);

export { router };
