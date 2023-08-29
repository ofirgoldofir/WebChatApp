const express = require("express");
const {
  getUser,
  postUser,
} = require("../controllers/UsersController");
const { validateToken } = require("../controllers/TokensController");
const routerUsers = express.Router();
routerUsers.route("/:username").get(validateToken, getUser);
routerUsers.route("/").post(postUser);
module.exports = routerUsers;
