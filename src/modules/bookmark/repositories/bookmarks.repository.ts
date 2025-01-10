import Bookmark from "../models/bookmarkModel";
import History from "../../history/models/historyModel";

/**
 * Repository function to create a new bookmark entry.
 *
 * @param historyId - The ID of the associated history entry.
 * @returns Promise<Bookmark> - The created bookmark.
 * @throws Error if the database operation fails.
 */
export const createBookmark = async (historyId: string): Promise<Bookmark> => {
  try {
    console.log("44444444444");
    const bookmark = await Bookmark.create({
      historyid: historyId,
      is_deleted: false,
    });
    console.log("555555555");
    return bookmark;
  } catch (error) {
    console.error("Error in createBookmark repository:", error);
    throw new Error("Database operation failed.");
  }
};

export const getBookmarks = async (
  page: number,
  size: number,
  orderBy: string,
  dir: string
): Promise<{
  total: number;
  page: number;
  size: number;
  bookmarks: { id: string; url: string; name: string }[];
}> => {
  const order = [[orderBy, dir.toUpperCase()]];
  const offset = (page - 1) * size;
  const { count, rows } = await Bookmark.findAndCountAll({
    attributes: ["id", "historyid"],
    include: {
      model: History,
      as: "history",
      attributes: ["name", "url"],
      where: { is_deleted: false },
    },
    limit: size,
    offset: (page - 1) * size,
    order: [
      orderBy === "name" || orderBy === "url"
        ? [{ model: History, as: "history" }, orderBy, dir.toUpperCase()]
        : [orderBy, dir.toUpperCase()],
    ],
  });

  return {
    total: count,
    page,
    size,
    bookmarks: rows.map((bookmarks) => bookmarks.toJSON()),
  };
};
