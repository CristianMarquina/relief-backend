"use strict";

/**
 * Migration that creates the "bookmarks" table with its respective columns and characteristics.
 *
 * @param {import('sequelize-cli').Migration} queryInterface - Interface for executing queries.
 * @param {import('sequelize').Sequelize} Sequelize - The Sequelize instance that defines data types.
 * @returns {Promise<void>}
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Method executed when the migration is applied (creating the "bookmarks" table).
   *
   * @param {object} queryInterface - Object to interact with the database.
   * @param {object} Sequelize - Object that defines Sequelize data types.
   * @returns {Promise<void>} - Promise that resolves when the "bookmarks" table has been created.
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookmarks", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        comment: "Unique identifier for each item",
      },
      historyid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        references: { model: "histories", key: "id" },
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        comment: "Logical deletion flag for the item, used for soft deletes",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "Timestamp of when the item was created",
      },
      deleteAt: {
        type: Sequelize.DATE,
        comment: "Timestamp of when the item was deleted",
      },
    });
  },
  /**
   * Method executed when the migration is reverted (deletion of the "bookmarks" table).
   *
   * @param {object} queryInterface - Object to interact with the database.
   * @param {object} Sequelize - Object that defines Sequelize data types.
   * @returns {Promise<void>} - Promise that resolves when the "bookmarks" table has been deleted.
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookmarks");
  },
};
