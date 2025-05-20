const models = require("../models");

// add authentication
// hash password
const bcrypt = require("bcrypt");
const salt = 10;

// function to create user with its username, password, email
// *password will be hashed
async function createUser(req, res) {
  try {
    console.log("this is createUser", req);

    const bodyUsername = req.body.username;
    const bodyPassword = req.body.password;
    // const bodyEmail = req.body.email;

    // hash the password input
    async function hashPassword(password) {
      return await bcrypt.hash(password, salt);
    }
    const hashedPassword = await hashPassword(bodyPassword);

    console.log("this is hashed password", hashedPassword);
    const user = {
      username: bodyUsername,
      password: hashedPassword,
      // email: bodyEmail,
    };

    console.log("this is userData", user);

    await models.Users.create(user);

    res.json({ user, result: true, message: "succeeded in creating user" });
  } catch (error) {
    console.log(error);
    console.error("error creating user");
    res.json({ result: false, message: "error in creating user" });
  }
}

// delete user with their associated posts
async function deleteUser(req, res) {
  try {
    const id = req.body.id;
    await models.Users.destroy({ where: { id: id } });
    res.json({ id, result: true, message: "succeeded in deleting user" });
  } catch (error) {
    console.log(error);
    console.error("error deleting user");
    res.json({ result: false, message: "error in deleting user" });
  }
}

// function to update user by 'id' (integer)
async function updateUser(req, res) {
  try {
    const bodyUsername = req.body.username;
    // const bodyEmail = req.body.email;

    const update = {
      username: bodyUsername,
    };
    const id = req.body.id;
    await models.Users.update(update, { where: { id: id } });

    res.json({ update, result: true, message: "succeeded in updating user" });
  } catch (error) {
    console.log(error);
    console.error("error in updating user");
    res.status(500).json({ result: false, error: "error updating user" });
  }
}

// get a single user information
async function getUser(req, res) {
  try {
    // since the userid is contained in the url instead of the body
    // in json format... ex) /users/${id}, the variable id
    // is set to req.params.id rather than body
    // const id = req.body.id;
    const id = req.params.id;
    const user = await models.Users.findOne({ where: { id: id } });

    res.json({
      user,
      result: true,
      message: "succeeded in getting user",
    });
  } catch (error) {
    console.log(error);
    console.error("error in getting user");
    res.status(500).json({ result: false, error: "error getting user" });
  }
}

// get all the posts written by user
async function getUserPosts(req, res) {
  try {
    // const id = req.body.id;
    const id = req.params.id;
    const postByUser = await models.Posts.findAll({
      where: { userid: id },
      order: [["createdAt", "DESC"]],
    });
    res.json({
      postByUser,
      result: true,
      message: "succeeded in getting posts by user",
    });
  } catch (error) {
    console.log(error);
    console.error("error in getting posts by user");
    res
      .status(500)
      .json({ result: false, error: "error getting posts by user" });
  }
}

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getUserPosts,
};
