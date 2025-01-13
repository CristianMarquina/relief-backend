import { Request, Response } from "express";
import {
  createHistory as createHistoryRepo,
  getHistories as getHistoriesRepo,
  deleteHistoryById,
} from "../repositories/histories.repository";

/**
 * Controller to handle creating a new history entry.
 *
 * This endpoint expects a JSON payload with 'name' and 'url' properties. If the 'name' is not provided, the 'url' will be used as the name.
 *
 * Request Body:
 * - name (optional): A string representing the name of the history entry.
 * - url (required): A string representing the URL associated with the history entry.
 *
 * Response:
 * - 200: History entry created successfully.
 * - 400: Missing required 'url' property in the request body.
 * - 500: Internal server error.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns void
 */
export const createHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let name = req.body.name ? req.body.name : req.body.url;
    let url = req.body.url;
    if (!url) {
      res.status(400).json({ message: "Name and URL are required." });
      return;
    }

    const history = await createHistoryRepo(name, url);
    res.status(200).json({
      message: "History created successfully.",
      history: {
        id: history.dataValues.id,
        name: history.dataValues.name,
        url: history.dataValues.url,
      },
    });
  } catch (error) {
    console.error("Error creating history:", error);
    res.status(500).json({
      message: "An error occurred while creating the history.",
    });
  }
};

/**
 * Controller to list all history entries.
 *
 * This endpoint retrieves a paginated list of history entries, with optional sorting by specific fields.
 *
 * Query Parameters:
 * - page (optional): A positive integer representing the page number (default: 1).
 * - size (optional): A positive integer representing the number of entries per page (default: 10).
 * - orderby (optional): A string representing the field to order by (default: 'createdAt').
 * - dir (optional): A string representing the sorting direction ('ASC' or 'DESC', default: 'DESC').
 *
 * Response:
 * - 200: Returns a paginated list of history entries.
 * - 400: Invalid query parameters.
 * - 500: Internal server error.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns void
 */

export const listHistories = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 100;
    const orderBy = (req.query.orderby as string) || "createdAt"; // Por defecto, ordenar por 'name'
    const dir = (req.query.dir as string) || "DESC";

    if (isNaN(page) || isNaN(size) || page <= 0 || size <= 0) {
      return res
        .status(400)
        .json({ message: "Page and size must be positive integers." });
    }
    const histories = await getHistoriesRepo(page, size, orderBy, dir);
    return res.status(200).json(histories);
  } catch (error) {
    console.error("Error listing histories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller to handle the logical deletion of a history entry.
 *
 * This endpoint marks a history entry as deleted by updating its 'is_deleted' property to true.
 *
 * URL Parameters:
 * - id (required): The unique identifier of the history entry to be deleted.
 *
 * Response:
 * - 200: History entry deleted successfully.
 * - 400: Missing or invalid 'id' parameter.
 * - 404: History entry not found or already marked as deleted.
 * - 500: Internal server error.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @returns void
 */
export const deleteHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required." });
    }

    const result = await deleteHistoryById(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "History not found or already deleted." });
    }

    return res.status(200).json({ message: "History deleted successfully." });
  } catch (error) {
    console.error("Error deleting history:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
