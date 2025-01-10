import History from "../models/historyModel";

/**
 * Repository for handling History-related database operations.
 */
export const createHistory = async (
  name: string,
  url: string
): Promise<History> => {
  try {
    // Create a new History entry in the database
    const history = await History.create({
      name,
      is_deleted: false, // Default value for logical deletion
    });

    return history;
  } catch (error) {
    console.error("Error in createHistory repository:", error);
    throw new Error("Database operation failed.");
  }
};
