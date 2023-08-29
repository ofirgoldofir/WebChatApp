const express = require("express");
const {
  getChats,
  postChats,
  getChatsByID,
  deleteChatsByID,
  postMessages,
  getMessages,
} = require("../controllers/ChatsController");
const { validateToken } = require("../controllers/TokensController");
const routerChats = express.Router();
routerChats.route("/").get(validateToken, getChats);
routerChats.route("/").post(validateToken, postChats);
routerChats.route("/:id").get(validateToken, getChatsByID);
routerChats.route("/:id").delete(validateToken, deleteChatsByID);
routerChats.route("/:id/Messages").post(validateToken, postMessages);
routerChats.route("/:id/Messages").get(validateToken, getMessages);
module.exports = routerChats;
