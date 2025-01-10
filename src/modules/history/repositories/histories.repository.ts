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
    return history;
  } catch (error) {
    console.error("Error in createHistory repository:", error);
    throw new Error("Database operation failed.");
  }
};

/**
 * Service to fetch all histories that are not deleted.
 * Only returns `url` and `name` fields.
 */
export const getHistories = async (): Promise<
  { url: string; name: string }[]
> => {
  const histories = await History.findAll({
    attributes: ["url", "name"], // Selecciona solo las columnas necesarias
    where: {
      is_deleted: false, // Filtra los registros no eliminados
    },
  });
  return histories.map((history) => history.toJSON());
};
