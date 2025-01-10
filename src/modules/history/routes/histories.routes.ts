import { Router } from "express";
import {
  createHistory,
  listHistories,
  deleteHistory,
} from "../controllers/histories.controller";
import { historySchema } from "../schemas/histories.schemas";
import { validate } from "../../../utils/validate.middleware";

const historiesRouter = Router();

/**
 * Route to create a new history entry.
 * @route POST /histories
 * @access Public
 */
historiesRouter.post("/", validate(historySchema), createHistory);

/**
 * Route to list all history entries.
 * @route GET /histories
 * @access Public
 */
historiesRouter.get("/", listHistories);

/**
 * Route to delete a history .
 * @route DELETE /histories/:id
 * @access Public
 */
historiesRouter.delete("/:id", deleteHistory);

export default historiesRouter;
