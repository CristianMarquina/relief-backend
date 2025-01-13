import { Request, Response } from "express";
import {
  createBookmark as createBookmarkRepo,
  getBookmarks as getBookmarksRepo,
  deleteBookmarkById,
} from "../repositories/bookmarks.repository";
/**
 * Controller to handle creating a new Bookmark entry.
 *
 * This endpoint expects a JSON payload with 'hisrtoryid'.
 *
 * Request Body:

 * - historyid (required):  string representing the name of the id history entry
 *
 * Response:
 * - 200: bookmark entry created successfully.
 * - 400: Missing required 'historyid' property in the request body.
 * - 500: Internal server error.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns void
 */
export const createBookmark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let historyid = req.body.historyid;
    if (!historyid) {
      res.status(400).json({ message: "historyid are required." });
      return;
    }
    const bookmark = await createBookmarkRepo(historyid);
    res.status(200).json({
      message: "bookmark created successfully.",
      bookmark: {
        id: bookmark.dataValues.id,
      },
    });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res.status(500).json({
      message: "An error occurred while creating the bookmark.",
    });
  }
};

/**
 * Controller to list all bookmark entries.
 *
 * This endpoint retrieves a paginated list of bookmark entries, with optional sorting by specific fields.
 *
 * Query Parameters:
 * - page (optional): A positive integer representing the page number (default: 1).
 * - size (optional): A positive integer representing the number of entries per page (default: 10).
 * - orderby (optional): A string representing the field to order by (default: 'createdAt').
 * - dir (optional): A string representing the sorting direction ('ASC' or 'DESC', default: 'DESC').
 *
 * Response:
 * - 200: Returns a paginated list of bookmark entries.
 * - 400: Invalid query parameters.
 * - 500: Internal server error.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns void
 */

export const listBookmarks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;
    const orderBy = (req.query.orderby as string) || "createdAt"; // Por defecto, ordenar por 'name'
    const dir = (req.query.dir as string) || "DESC";

    if (isNaN(page) || isNaN(size) || page <= 0 || size <= 0) {
      return res
        .status(400)
        .json({ message: "Page and size must be positive integers." });
    }
    const bookmarks = await getBookmarksRepo(page, size, orderBy, dir);
    return res.status(200).json(bookmarks);
  } catch (error) {
    console.error("Error listing bookmarks:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller to handle the logical deletion of a bookmark entry.
 *
 * This endpoint marks a bookmark entry as deleted by updating its 'is_deleted' property to true.
 *
 * URL Parameters:
 * - id (required): The unique identifier of the bookmark entry to be deleted.
 *
 * Response:
 * - 200: bookmark entry deleted successfully.
 * - 400: Missing or invalid 'id' parameter.
 * - 404: bookmark entry not found or already marked as deleted.
 * - 500: Internal server error.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns void
 */
export const deleteBookmark = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const result = await deleteBookmarkById(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Bookmark not found or already deleted." });
    }

    return res.status(200).json({ message: "Bookmark deleted successfully." });
  } catch (error) {
    console.error("Error deleting Bookmark:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
