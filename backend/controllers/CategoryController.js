const models = require("../models");

async function createCategory(req, res) {
  try {
    console.log("this is categroy", req.body);

    const { label } = req.body;
    const category = {
      label: label,
    };
    await models.Categories.create(category);

    res.json({
      category,
      result: true,
      message: "succeeded in creating category",
    });
  } catch (error) {
    console.log(error);
    console.error("error in creating category");
    res.json({ result: false, message: "error in creating category" });
  }
}

async function deleteCategory(req, res) {
  try {
    const { id } = req.body;
    await models.Categories.destroy({ where: { id: id } });
    res.json({ id, result: true, message: `category with ${id} is deleted` });
  } catch (error) {
    console.log(error);
    console.error("error in deleting");
    res.json({ result: false, message: "error in deleting category" });
  }
}

async function getCategory(req, res) {
  try {
    const { id } = req.body;
    const category = await models.Categories.findOne({ where: { id: id } });
    const label = category.label;
    res.json({
      label,
      result: true,
      message: "succeeded in getting category",
    });
  } catch (error) {
    console.log(error);
    console.error("error in getting category");
    res.status(500).json({ result: false, error: "error getting category" });
  }
}

module.exports = { createCategory, deleteCategory, getCategory };
