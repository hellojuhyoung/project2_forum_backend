const fixedCategories = require("./data/fixedCategories"); // Adjust path as needed

/**
 * Seeds fixed categories into the database if they don't already exist.
 * @param {object} sequelizeInstance - The Sequelize instance (db.sequelize).
 */
async function seedCategories(sequelizeInstance) {
  console.log("Starting category seeding process...");

  for (const categoryName of fixedCategories) {
    try {
      // 1. Check if the category already exists using Sequelize's query method
      //    Adjust 'category' table and 'name' column if needed.
      const [results] = await sequelizeInstance.query(
        "SELECT id FROM category WHERE name = ?",
        {
          replacements: [categoryName], // Use replacements for safe parameter binding
          type: sequelizeInstance.QueryTypes.SELECT,
        }
      );

      if (results.length === 0) {
        // 2. If it doesn't exist, insert the new category
        await sequelizeInstance.query(
          "INSERT INTO category (name) VALUES (?)",
          {
            replacements: [categoryName],
            type: sequelizeInstance.QueryTypes.INSERT,
          }
        );
        console.log(`Inserted new category: ${categoryName}`);
      } else {
        // 3. If it already exists, skip insertion
        console.log(`Category already exists: ${categoryName}`);
      }
    } catch (error) {
      console.error(`Error seeding category "${categoryName}":`, error.message);
    }
  }
  console.log("Category seeding process completed.");
}

module.exports = seedCategories;
