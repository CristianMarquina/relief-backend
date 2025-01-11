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
    const bookmark = await Bookmark.create({
      historyid: historyId,
      is_deleted: false,
    });
    return bookmark;
  } catch (error) {
    console.error("Error in createBookmark repository:", error);
    throw new Error("Database operation failed.");
  }
};

/**
 * Repository for fetching all non-deleted Bookmark records from the database.
 * The function supports pagination and sorting.
 *
 * @param page - The current page number for pagination (1-based index).
 * @param size - The number of records to fetch per page.
 * @param orderBy - The field by which the records should be sorted (e.g., 'name' or 'createdAt').
 * @param dir - The sorting direction ('ASC' for ascending or 'DESC' for descending).
 *
 * @returns A Promise that resolves to an object containing:
 * - `total`: The total number of non-deleted records.
 * - `page`: The current page number.
 * - `size`: The number of records per page.
 * - `bookmarks`: An array of bookmark objects containing only `id`, `url`, and `name` fields.
 */
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

/**
 * Repository for performing a logical delete of a Bookmark record in the database.
 * The function marks the `is_deleted` field as `true` for the specified record.
 *
 * @param id - The unique identifier of the Bookmark record to delete.
 *
 * @returns A Promise that resolves to `true` if the record was successfully updated,
 * or `false` if the record was not found or is already deleted.
 */

export const deleteBookmarkById = async (id: string): Promise<boolean> => {
  const bookmark = await Bookmark.findOne({
    where: { id, is_deleted: false },
  });

  if (!bookmark) {
    return false;
  }

  await bookmark.update({ is_deleted: true });
  return true;
};
