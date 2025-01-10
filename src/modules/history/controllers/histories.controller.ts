import { Request, Response } from "express";
import {
  createHistory as createHistoryRepo,
  getHistories as getHistoriesRepo,
} from "../repositories/histories.repository";

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
    console.log("111111111111111111111");
    let name = req.body.name ? req.body.name : req.body.url;
    let url = req.body.url;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    if (!url) {
      res.status(400).json({ message: "Name and URL are required." });
      return;
    }
    console.log("222222222222222222");

    // Delegate database interaction to the repository
    const history = await createHistoryRepo(name, url);
    console.log("777777777777777777777");
    // Respond with a success message and the created entry
    res.status(200).json({
      message: "History created successfully.",
      history: {
        name: history.name,
        url: history.url,
      },
    });
  } catch (error) {
    console.error("Error creating history:", error);
    console.log("88888888888888888");
    res.status(500).json({
      message: "An error occurred while creating the history.",
    });
  }
};

/**
 * Controller to list all histories.
 */
export const listHistories = async (req: Request, res: Response) => {
  try {
    const histories = await getHistoriesRepo();
    return res.status(200).json(histories);
  } catch (error) {
    console.error("Error listing histories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
