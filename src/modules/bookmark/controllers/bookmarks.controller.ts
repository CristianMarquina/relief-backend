import { Request, Response } from "express";
import {
  createBookmark as createBookmarkRepo,
  getBookmarks as getBookmarksRepo,
} from "../repositories/bookmarks.repository";

export const createBookmark = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("1111111111");
    let historyid = req.body.historyid;
    console.log("2222222222222");
    console.log(historyid);
    if (!historyid) {
      res.status(400).json({ message: "historyid are required." });
      return;
    }
    console.log("3333333333333333");
    const bookmark = await createBookmarkRepo(historyid);
    console.log("6666666666666");
    res.status(200).json({
      message: "bookmark created successfully.",
    });
  } catch (error) {
    console.error("Error creating bookmark:", error);
    res.status(500).json({
      message: "An error occurred while creating the bookmark.",
    });
  }
};

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
