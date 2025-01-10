import { Request, Response } from "express";
import { createHistory as createHistoryRepo } from "../repositories/histories.repository";

/**
 * Controller to handle creating a new history entry.
 * It expects a JSON payload with 'name' and 'url' properties.
 * @param req - Express request object
 * @param res - Express response object
 */
export const createHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const name = req.body.name ? req.body.name : req.body.url;
    const url = req.body.url;
    if (!url) {
      res.status(400).json({ message: "Name and URL are required." });
      return;
    }

    // Delegate database interaction to the repository
    const history = await createHistoryRepo(name, url);

    // Respond with a success message and the created entry
    res.status(200).json({
      message: "History created successfully.",
      history,
    });
  } catch (error) {
    console.error("Error creating history:", error);
    res.status(500).json({
      message: "An error occurred while creating the history.",
    });
  }
};
