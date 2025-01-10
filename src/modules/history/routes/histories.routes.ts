import { Router } from "express";
import { createHistory } from "../controllers/histories.controller";

const historiesRouter = Router();

/**
 * Route to create a new history entry.
 * @route POST /histories
 * @access Public
 */
historiesRouter.post("/", createHistory);

export default historiesRouter;
