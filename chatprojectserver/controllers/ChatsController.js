const Chats = require("../services/ChatsService");
const Tokens = require("./TokensController");

const determineStatus = (status1, status2, value) => {
  if (value === null) {
    return status2;
  } else {
    return status1;
  }
};

const getChats = async (req, res) => {
  try {
    const header = await req.headers["authorization"];
    const username = Tokens.getUsernameFromToken(header);
    const chats = await Chats.getChats(username);
    //to check if the request jwt is correct
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const postChats = async (req, res) => {
  try {
    //to check if the request jwt is correct
    const header = await req.headers["authorization"];
    const myUsername = Tokens.getUsernameFromToken(header);
    const users = []
    users.push(req.body.username);
    const chats = await Chats.postChats(myUsername, users);
    //did that on almost everything, might need tom be changed
    res.status(determineStatus(200, 400, chats)).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getChatsByID = async (req, res) => {
  try {
    const chats = await Chats.getChatsByID(req.params.id);
    //to check if the request jwt is correct
    res.status(determineStatus(200, 401, chats)).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteChatsByID = async (req, res) => {
  try {
    const chats = await Chats.deleteChatsByID(req.params.id);
    //to check if the request jwt is correct
    res.status(determineStatus(204, 404, chats)).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const postMessages = async (req, res) => {
  try {
    const header = await req.headers["authorization"];
    const myUsername = Tokens.getUsernameFromToken(header);
    const chats = await Chats.postMessages(
      req.params.id,
      req.body.msg,
      myUsername
    );
    //to check if the request jwt is correct
    res.status(determineStatus(200, 401, chats)).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const getMessages = async (req, res) => {
  try {
    const chats = await Chats.getMessages(req.params.id);
    //to check if the request jwt is correct
    res.status(determineStatus(200, 401, chats)).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getChats,
  postChats,
  getChatsByID,
  deleteChatsByID,
  postMessages,
  getMessages,
};
