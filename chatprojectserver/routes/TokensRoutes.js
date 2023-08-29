const express = require("express");
const {
    postToken
} = require("../controllers/TokensController");
const routerTokens = express.Router();
routerTokens.route("/").post(postToken);
module.exports = routerTokens;
