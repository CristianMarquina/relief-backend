import { Router } from "express";
import {
  createBookmark,
  listBookmarks,
  deleteBookmark,
} from "../controllers/bookmarks.controller";
import { bookmarkSchema } from "../schemas/histories.schemas";
import { validate } from "../../../utils/validate.middleware";

const bookmarksRouter = Router();

/**
 * Route to create a new bookmark entry.
 * @route POST /bookmark
 * @access Public
 */
bookmarksRouter.post("/", validate(bookmarkSchema), createBookmark);

/**
 * Route to list all bookmark entries.
 * @route GET /bookmark
 * @access Public
 */
bookmarksRouter.get("/", listBookmarks);

/**
 * Route to delete a bookmark .
 * @route DELETE /bookmark/:id
 * @access Public
 */
bookmarksRouter.delete("/:id", deleteBookmark);

export default bookmarksRouter;
