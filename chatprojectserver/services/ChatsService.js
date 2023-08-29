const Chat = require("../Models/ChatsModel");
const User = require("../Models/UsersModel");

getChats = async (username) => {
  try {
    const chats = [];
    const allChats = await Chat.find();
    const chatValues = Object.values(allChats);
    for (const chat of chatValues) {
      for (const user of chat.users) {
        const newUser = await User.find({ _id: user });
        if (newUser[0].username === username) {
          chats.push(chat);
        }
      }
    }
    const transformedChats = [];

    for (const chat of chats) {
      let transformedChat;
      const firstUserInTheArray = await User.findOne({ _id: chat.users[0] });
      const secondUserInTheArray = await User.findOne({ _id: chat.users[1] });
      const otherUserId =
        username !== firstUserInTheArray.username ? firstUserInTheArray : secondUserInTheArray;
      const otherUser = await User.findOne({ _id: otherUserId });
      if (chat.messages.length == 0) {
        transformedChat = {
          id: chat.id,
          user: {
            username: otherUser.username,
            displayName: otherUser.displayName,
            profilePic: otherUser.profilePic,
          },
          lastMessage: null,
        };
      } else {
        const lastMessage = chat.messages[chat.messages.length - 1];

        transformedChat = {
          id: chat.id,
          user: {
            username: otherUser.username,
            displayName: otherUser.displayName,
            profilePic: otherUser.profilePic,
          },
          lastMessage: {
            id: lastMessage.id,
            created: lastMessage.created,
            content: lastMessage.content,
          },
        };
      }
      transformedChats.push(transformedChat);
    }
    return transformedChats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return [];
  }
};

postChats = async (myUsername, otherUsername) => {
  try {
    const chats = await Chat.find();
    const id = chats.reduce((max, chat) => Math.max(max, chat.id), 0) + 1;
    const users = [];
    const myUser = await User.findOne({ username: myUsername });
    users.push(myUser);
    for (let i = 0; i < otherUsername.length; i++) {
      const otherUser = await User.findOne({ username: otherUsername[i] });
      users.push(otherUser);
    }
    const newChat = new Chat({
      id: id,
      users: users,
      messages: [],
    });
    await newChat.save();
    const returnChat = {
      id: id,
      user: users[1],
    };
    return returnChat;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return null;
  }
};
getChatsByID = async (id) => {
  const chat = await Chat.findOne({ id });
  return chat;
};
deleteChatsByID = async (id) => {
  await Chat.deleteOne({ id });
  return Chat;
};

postMessages = async (id, message, username) => {
  const myUser = await User.findOne({ username: username });
  const myUserToSend = {
    username: myUser.username,
    displayName: myUser.displayName,
    profilePic: myUser.profilePic,
  };
  const chat = await Chat.findOne({ id: id });

  const maxId = chat.messages.reduce((max, message) => {
    return message.id > max ? message.id : max;
  }, 0);

  const newMessage = {
    id: maxId + 1,
    created: Date.now(),
    sender: myUserToSend,
    content: message,
  };
  chat.messages.push(newMessage);
  await Chat.findOneAndUpdate({ id: id }, { messages: chat.messages }, { new: true });
  return newMessage;
};


getMessages = async (id) => {
  const chat = await Chat.findOne({ id });
  return chat.messages;
};

module.exports = {
  getChats,
  postChats,
  getChatsByID,
  deleteChatsByID,
  postMessages,
  getMessages,
};
