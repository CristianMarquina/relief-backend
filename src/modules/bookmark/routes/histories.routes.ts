import { Router } from "express";
import {
  createBookmark,
  listBookmarks,
} from "../controllers/bookmarks.controller";
import { bookmarkSchema } from "../schemas/histories.schemas";
import { validate } from "../../../utils/validate.middleware";

const bookmarksRouter = Router();

/**
 * Route to create a new history entry.
 * @route POST /histories
 * @access Public
 */
bookmarksRouter.post("/", validate(bookmarkSchema), createBookmark);

/**
 * Route to list all history entries.
 * @route GET /histories
 * @access Public
 */
bookmarksRouter.get("/", listBookmarks);

/**
 * Route to delete a history .
 * @route DELETE /histories/:id
 * @access Public
 */
//bookmarksRouter.delete("/:id", deleteHistory);

export default bookmarksRouter;
