const Users = require("../services/UsersService");

const determineStatus = (status1, status2, value) => {
  if (value === null) {
    return status2;
  } else {
    return status1;
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Users.getUser(req.params.username);
    //to check if the request jwt is correct
    res.status(determineStatus(200, 401, user)).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const postUser = async (req, res) => {
  try {
    //to check if the request jwt is correct
    const user = await Users.postUser(
      req.body.username,
      req.body.password,
      req.body.displayName,
      req.body.profilePic
    );
    //did that on almost everything, might need tom be changed
    res.status(determineStatus(200, 409, user)).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUser,
  postUser,
};
