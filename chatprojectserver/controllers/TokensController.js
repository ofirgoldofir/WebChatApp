const User = require("../Models/UsersModel");
const Tokens = require("../services/TokensService");
const jwt = require("jsonwebtoken");
//require("dotenv").config();
const customEnv = require("custom-env");
customEnv.env(process.env.NODE_ENV, "./config");

const determineStatus = (status1, status2, value) => {
  if (value === null) {
    return status2;
  } else {
    return status1;
  }
};

// const postToken = async (req, res) => {
//   try {
//     //check if password is correct
//     username = req.body.username;
//     const token = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET);
//     //to check if the request jwt is correct
//     res.status(determineStatus(200, 404, token)).json(token);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const postToken = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordMatch = await Tokens.comparePasswords(password, user.password);
    if (!isPasswordMatch) {
      // Invalid password
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET);
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


const validateToken = async (req, res, next) => {
  const authHeader = await req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  let updatedToken = token.replace(/"/g, "");

  jwt.verify(updatedToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.user = user;
    next();
  });
};

const getUsernameFromToken = (authHeader) => {
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return null;
  const secondauthHeader = token.split(".")[1];
  const jsonauthHeader = atob(secondauthHeader);
  return JSON.parse(jsonauthHeader).username
};

module.exports = {
  postToken,
  validateToken,
  getUsernameFromToken,
};
