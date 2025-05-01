const categoryController = require("../controllers/CategoryController");
const express = require("express");
const router = express.Router();

// routes with different methods
//
// get category
router.get("/:id", categoryController.getCategory);

// create category
router.post("/", categoryController.createCategory);

// delete category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
