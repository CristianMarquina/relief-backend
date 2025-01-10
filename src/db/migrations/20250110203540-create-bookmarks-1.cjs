"use strict";

/**
 * Migration that adds the "updatedAt" column to the "bookmarks" table.
 *
 * @param {import('sequelize-cli').Migration} queryInterface - Interface for executing queries.
 * @param {import('sequelize').Sequelize} Sequelize - The Sequelize instance that defines data types.
 * @returns {Promise<void>}
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Method executed when the migration is applied (adding the "updatedAt" column).
   *
   * @param {object} queryInterface - Object to interact with the database.
   * @param {object} Sequelize - Object that defines Sequelize data types.
   * @returns {Promise<void>} - Promise that resolves when the "updatedAt" column has been added.
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("bookmarks", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      comment: "Timestamp of when the Bookmark was updated",
    });
  },

  /**
   * Method executed when the migration is reverted (removing the "updatedAt" column).
   *
   * @param {object} queryInterface - Object to interact with the database.
   * @param {object} Sequelize - Object that defines Sequelize data types.
   * @returns {Promise<void>} - Promise that resolves when the "updatedAt" column has been removed.
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("bookmarks", "updatedAt");
  },
};
