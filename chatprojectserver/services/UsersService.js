const User = require("../Models/UsersModel");

getUser = async (username) => {
  const user = await User.findOne({ username: username });
  const returnUser = {
    username: user.username,
    displayName: user.displayName,
    profilePic: user.profilePic,
  }
  return returnUser;
};

postUser = async (username, password, displayName, profilePic) => {
  try {
    // Check if a user with the provided username already exists
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return null; // User already exists
    }

    const user = new User({
      username: username,
      password: password,
      displayName: displayName,
      profilePic: profilePic,
    });

    await user.save();
    return user;
  } catch (error) {
    return null;
  }
};

deleteUser = async (username) => {
  await User.deleteOne({ username: username });
  return User;
};

updatePassword = async (username, password) => {
  const user = await User.findOne({ username: username });
  user.password = password;
  await user.save();
  return user;
}

updateDisplayName = async (username, displayName) => {
  const user = await User.findOne({ username: username });
  user.displayName = displayName;
  await user.save();
  return user;
};

updateProfilePic = async (username, profilePic) => {
  const user = await User.findOne({ username: username });
  user.profilePic = profilePic;
  await user.save();
  return user;
};

module.exports = {
  getUser,
  postUser,
  deleteUser,
  updatePassword,
  updateDisplayName,
  updateProfilePic,
};
