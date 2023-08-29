import Contact from "./Contact";
import Contacts from "./Contacts";
const apiRequests = async (currentUser) => {

  /* ------------------ Tokens ------------------*/
  const apiToken = async () => {
    try {
      const data = {
        username: currentUser.getUserName(),
        password: currentUser.getPassword(),
      };
      const response = await fetch("http://localhost:5000/api/Tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const tokenJWT = await response.text();
        if (localStorage.getItem("tokenJWT") !== null) {
          localStorage.removeItem("tokenJWT");
        }
        localStorage.setItem("tokenJWT", tokenJWT);
        return tokenJWT;
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };
  /* ------------------ Chats ------------------*/
  const apiGetChats = async () => {
    const response = await fetch("http://localhost:5000/api/Chats", {
      method: "GET",
      headers: {
        accept: "text/plain",
        Authorization: "Bearer " + localStorage.getItem("tokenJWT"),
      },
    });
    if (response.ok) {
      const chats = await response.json();
      return chats;
    } else {
      if (!(await apiToken())) return null;
      else await apiGetChats();
    }
  };

  const apiPostChat = async (username) => {
    const exists = await apiGetChatID(username);
    if (!exists) {
      const data = {
        username: username,
      };
      try {
        const response = await fetch("http://localhost:5000/api/Chats", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("tokenJWT"),
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          return await response.json();
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    } else {
      return null;
    }
  };

  const apiGetChat = async (username) => {
    const id = await apiGetChatID(username);
    if (id) {
      const chats = await apiGetChats();
      for (const chat of chats) {
        if (chat.id === id) {
          return chat;
        }
      }
    } else {
      return null;
    }
  };

  const apiGetChatID = async (username) => {
    const chats = await apiGetChats();
    if (!chats) return null;
    for (const chat of chats) {
      if (chat.user && chat.user.username === username) {
        return chat.id;
      }
    }
    return null;
  };

  const apiDeleteChat = async (username) => {
    const id = await apiGetChatID(username);
    if (id) {
      const response = await fetch(`http://localhost:5000/api/Chats/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`,
        },
      });
      if (response.ok) {
        // return await response.json();
        return 1;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  /* ------------------ Messages ------------------*/
  const apiPostMessages = async (username, newMessage) => {
    const message = {
      msg: newMessage,
    };
    const id = await apiGetChatID(username);
    if (id) {
      const response = await fetch(
        `http://localhost:5000/api/Chats/${id}/Messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
            Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`,
          },
          body: JSON.stringify(message),
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const apiGetMessages = async (username) => {
    const id = await apiGetChatID(username);
    if (id) {
      const response = await fetch(
        `http://localhost:5000/api/Chats/${id}/Messages`,
        {
          method: "GET",
          headers: {
            accept: "text/plain",
            authorization: `Bearer ${localStorage.getItem("tokenJWT")}`,
          },
        }
      );
      if (response.ok) {
        const messages = await response.json();
        return messages;
      } else {
        if (!(await apiToken())) return null;
        else await apiGetChats();
      }
    } else {
      return null;
    }
  };

  /* ------------------ Users ------------------*/
  const apiGetUser = async (username) => {
    const response = await fetch(
      `http://localhost:5000/api/Users/${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`,
        },
      }
    );
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  };

  const apiPostUser = async () => {
    const data = {
      username: currentUser.getUserName(),
      password: currentUser.getPassword(),
      displayName: currentUser.getDisplayName(),
      profilePic: currentUser.getImage(),
    };

    const response = await fetch(`http://localhost:5000/api/Users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  };


  /* ------------------ Helpers ------------------*/

  const apiGetContactLastMessageContent = async (username) => {
    const res = await apiGetChat(username);
    const obj = await res.lastMessage;
    const lastMessage = obj !== null ? await obj.content : "";
    return lastMessage;
  };
  const apiGetContactLastMessageTime = async (username) => {
    const res = await apiGetChat(username);
    const obj = await res.lastMessage;
    const lastMessageTimeAndDate = obj !== null ? await obj.created : "";
    if (lastMessageTimeAndDate !== "") {
      const dt = new Date(lastMessageTimeAndDate);
      const hours = dt.getHours();
      const minutes = dt.getMinutes();
      const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      return timeStr;
    }
    return lastMessageTimeAndDate;
  };
  const apiGetContactLastMessageDate = async (username) => {
    const res = await apiGetChat(username);
    const obj = await res.lastMessage;
    const lastMessageTimeAndDate = obj !== null ? await obj.created : "";
    if (lastMessageTimeAndDate !== "") {
      const dt = new Date(lastMessageTimeAndDate);
      const dateStr = `${dt.getDate()}/${dt.getMonth() + 1
        }/${dt.getFullYear()}`;
      return dateStr;
    }
    return lastMessageTimeAndDate;
  };

  const convertJSONToContacts = async (chatsJson) => {
    const tempContacts = [];

    for (const jsonObject of chatsJson) {
      const user = jsonObject.user;
      const userName = user.username;
      const displayName = user.displayName;
      const profilePic = user.profilePic;

      const newContact = new Contact(
        userName,
        displayName,
        profilePic,
        new Map()
      );
      tempContacts.push(newContact);
    }

    const contacts = new Contacts();
    contacts.setContacts(tempContacts);
    return contacts;
  };

  const FirstLogInConvertJSONToContacts = async (chatsJson) => {
    const tempContacts = [];

    for (const jsonObject of chatsJson) {
      const user = jsonObject.user;
      const userName = user.username;
      const displayName = user.displayName;
      const profilePic = user.profilePic;
      if (jsonObject.lastMessage !== null) {
        // eslint-disable-next-line
        const { content, created, sender } = jsonObject.lastMessage;
        const messageContent = content;
        const time = new Date(created).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const date = new Date(created).toLocaleDateString();
        const senderUsername = "sender";

        const tempMap = new Map();
        tempMap.set(0, {
          messageContent: messageContent,
          time: time,
          date: date,
          sender: senderUsername,
        });
        const newContact = new Contact(
          userName,
          displayName,
          profilePic,
          tempMap
        );
        tempContacts.push(newContact);
      } else {
        const newContact = new Contact(
          userName,
          displayName,
          profilePic,
          new Map()
        );
        tempContacts.push(newContact);
      }
    }

    const contacts = new Contacts();
    contacts.setContacts(tempContacts);
    return contacts;
  };


  const convertJSONToMessages = async (messagesJson) => {
    if (messagesJson !== null) {
      const messageMap = new Map();
      messagesJson.forEach((message, index) => {
        const messageId = index + 1;
        const { content, created, sender } = message;

        const messageContent = content;
        const time = new Date(created).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        const date = new Date(created).toLocaleDateString();
        const senderUsername = sender.username;

        const messageDetails = {
          messageContent,
          time,
          date,
          sender: senderUsername,
        };
        messageMap.set(messageId, messageDetails);
      });
      // return messageMap;
      // const reversedMap = reverseMap(messageMap);
      return messageMap;
    } else {
      return new Map();
    }
  };
  // eslint-disable-next-line
  function reverseMap(originalMap) {
    const reversedMap = new Map();
    const keys = Array.from(originalMap.keys()).reverse();

    keys.forEach((key) => {
      const value = originalMap.get(key);
      reversedMap.set(key, value);
    });

    return reversedMap;
  }

  return {
    apiToken,
    apiGetChats,
    apiGetChat,
    apiPostChat,
    apiGetChatID,
    apiDeleteChat,
    apiGetUser,
    apiPostUser,
    convertJSONToContacts,
    apiGetMessages,
    convertJSONToMessages,
    apiPostMessages,
    apiGetContactLastMessageContent,
    apiGetContactLastMessageDate,
    apiGetContactLastMessageTime,
    FirstLogInConvertJSONToContacts,
  };
};
export default apiRequests;
