import History from "../models/historyModel";

/**
 * Repository for handling creation of a new History record in the database.
 *
 * @param name - The name of the history entry. This can be a user-provided value or derived from the URL.
 * @param url - The URL associated with the history entry.
 *
 * @returns A Promise that resolves to the newly created History object.
 */
export const createHistory = async (
  name: string,
  url: string
): Promise<History> => {
  try {
    const history = await History.create({
      name,
      url,
      is_deleted: false,
    });
    return history;
  } catch (error) {
    console.error("Error in createHistory repository:", error);
    throw new Error("Database operation failed.");
  }
};

/**
 * Repository for fetching all non-deleted History records from the database.
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
 * - `histories`: An array of history objects containing only `id`, `url`, and `name` fields.
 */
export const getHistories = async (
  page: number,
  size: number,
  orderBy: string,
  dir: string
): Promise<{
  total: number;
  page: number;
  size: number;
  histories: { id: string; url: string; name: string }[];
}> => {
  const order = [[orderBy, dir.toUpperCase()]];
  const offset = (page - 1) * size;
  const { count, rows } = await History.findAndCountAll({
    attributes: ["id", "url", "name"],
    where: {
      is_deleted: false,
    },
    limit: size,
    offset,
    order,
  });

  return {
    total: count,
    page,
    size,
    histories: rows.map((history) => history.toJSON()),
  };
};

/**
 * Repository for performing a logical delete of a History record in the database.
 * The function marks the `is_deleted` field as `true` for the specified record.
 *
 * @param id - The unique identifier of the history record to delete.
 *
 * @returns A Promise that resolves to `true` if the record was successfully updated,
 * or `false` if the record was not found or is already deleted.
 */

export const deleteHistoryById = async (id: string): Promise<boolean> => {
  const history = await History.findOne({
    where: { id, is_deleted: false },
  });

  if (!history) {
    return false;
  }

  await history.update({ is_deleted: true });
  return true;
};
