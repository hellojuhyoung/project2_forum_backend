const fixedCategories = require("./data/fixedCategories"); // Adjust path as needed
const models = require("../models");

/**
 * Seeds fixed categories into the database if they don't already exist.
 * @param {object} sequelizeInstance - The Sequelize instance (db.sequelize).
 */
async function seedCategories() {
  console.log("Starting category seeding process...");

  for (const categoryName of fixedCategories) {
    try {
      // Use Sequelize's findOne method directly on the Categories model
      const existingCategory = await models.Categories.findOne({
        where: { label: categoryName },
      });

      // If existingCategory is null (meaning not found), then create it
      if (!existingCategory) {
        // This checks if existingCategory is null or undefined
        await models.Categories.create({ label: categoryName });
        console.log(`Inserted new category: ${categoryName}`);
      } else {
        console.log(`Category already exists: ${categoryName}`);
      }
    } catch (error) {
      console.error(`Error seeding category "${categoryName}":`, error.message);
    }
  }
  console.log("Category seeding process completed.");
}

module.exports = seedCategories;
