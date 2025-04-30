const models = require("../models");

// function to create user with its username, password, email
// *password will be hashed
async function createUser(req, res) {
  try {
    console.log("this is createUser", req);

    const bodyUsername = req.body.username;
    const bodyPassword = req.body.password;
    const bodyEmail = req.body.email;

    const user = {
      username: bodyUsername,
      password: bodyPassword,
      email: bodyEmail,
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

module.exports = {
  createUser,
  deleteUser,
};
