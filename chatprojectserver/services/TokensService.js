const User = require("../Models/UsersModel");

comparePasswords = async (password, hashedPassword) => {
    if (password === hashedPassword) {
        return true;
    }
    return false;
};

module.exports = {
    comparePasswords,
};
