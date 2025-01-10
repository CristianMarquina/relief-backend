"use strict";

/**
 * Migration that creates the "histories" table with its respective columns and characteristics.
 *
 * @param {import('sequelize-cli').Migration} queryInterface - Interface for executing queries.
 * @param {import('sequelize').Sequelize} Sequelize - The Sequelize instance that defines data types.
 * @returns {Promise<void>}
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Method executed when the migration is applied (creating the "histories" table).
   *
   * @param {object} queryInterface - Object to interact with the database.
   * @param {object} Sequelize - Object that defines Sequelize data types.
   * @returns {Promise<void>} - Promise that resolves when the "histories" table has been created.
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("histories", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        comment: "Unique identifier for each item",
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [1, 255],
        },
        comment: "url of the history",
      },
      name: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
          len: [1, 64],
        },
        comment: "Name of the HISTORY, must be between 1 and 64 characters",
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
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: "Timestamp of the last update of the item",
      },
      deleteAt: {
        type: Sequelize.DATE,
        comment: "Timestamp of when the item was deleted",
      },
    });
  },
  /**
   * Method executed when the migration is reverted (deletion of the "histories" table).
   *
   * @param {object} queryInterface - Object to interact with the database.
   * @param {object} Sequelize - Object that defines Sequelize data types.
   * @returns {Promise<void>} - Promise that resolves when the "histories" table has been deleted.
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("histories");
  },
};
