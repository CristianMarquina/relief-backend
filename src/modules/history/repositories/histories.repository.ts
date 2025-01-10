import History from "../models/historyModel";

/**
 * Repository for handling History-related database operations.
 */
export const createHistory = async (
  name: string,
  url: string
): Promise<History> => {
  console.log("4444444444444444444");
  try {
    // Create a new History entry in the database
    console.log("5555555555555555555555555");
    const history = await History.create({
      name,
      url,
      is_deleted: false, // Default value for logical deletion
    });

    console.log("66666666666666666");
    //console.log(history);
    return history;
  } catch (error) {
    console.error("Error in createHistory repository:", error);
    throw new Error("Database operation failed.");
  }
};

/**
 * Service to fetch all histories that are not deleted.
 * Only returns `id` ,`url` and `name` fields.
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
