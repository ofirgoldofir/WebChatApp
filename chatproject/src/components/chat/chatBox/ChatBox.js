import { useEffect, useState } from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatBoxFooter from "./ChatBoxFooter";
import MeMessage from "./MeMessage";
import YouMessage from "./YouMessage";
import welcomePic from "../../../icons/welcomeChat2.png";
import apiRequests from "../../../data/apiRequests";
function ChatBox({
  contactList,
  setContactList,
  selectedContact,
  setSelectedContact,
  currentUser,
  setFilterDisplay,
  newMessageFlag,
  setNewMessageFlag,
  socket,
}) {
  const [messages, setMessages] = useState([]);
  const [newMessageObject, setNewMessageObject] = useState("");

  const handleSend = async (newMessage) => {
    const apiReq = await apiRequests(currentUser);
    const resMessage = await apiReq.apiPostMessages(
      selectedContact,
      newMessage
    );
    const date = parseDate(resMessage.created);
    const time = parseTime(resMessage.created);
    const messageObj = {
      id: resMessage.id,
      messageContent: resMessage.content,
      time: time,
      date: date,
      sender: resMessage.sender,
    };
    setNewMessageObject(messageObj);
    setNewMessageFlag(!newMessageFlag);
    scrollToBottom();
    socket.emit("send_message", {
      message: messageObj,
      receiver: selectedContact,
    });
  };



  useEffect(() => {
    const fetchData = async () => {
      if (selectedContact !== "") {
        const apiReq = await apiRequests(currentUser);
        const resGetMessages = await apiReq.apiGetMessages(selectedContact);
        const newMessages = await apiReq.convertJSONToMessages(resGetMessages);
        setMessages(newMessages);
        scrollToBottom();
      } else {
        setMessages([]);
      }
    };
    fetchData();
  }, [selectedContact, currentUser]);

  useEffect(() => {
    if (selectedContact !== "") {
      const messageId = newMessageObject.id;
      const messageObjWithoutId = {
        messageContent: newMessageObject.messageContent,
        time: newMessageObject.time,
        date: newMessageObject.date,
        sender: newMessageObject.sender.username,
      };
      const newMap = new Map(messages);
      newMap.set(messageId, messageObjWithoutId);
      setMessages(newMap);
      scrollToBottom();
    } else {
      setMessages([]);
    }
    // eslint-disable-next-line
  }, [newMessageFlag]);

  useEffect(() => {
    socket.on("receive_delete_contact", (data) => {
      if (selectedContact === data.deleter) {
        setSelectedContact("");
      }
    });
    socket.on("receive_message", (data) => {
      if (selectedContact !== "") {
        if (data.message.sender.username === selectedContact) {
          const messageId = data.message.id;
          const messageObjWithoutId = {
            messageContent: data.message.messageContent,
            time: data.message.time,
            date: data.message.date,
            sender: data.message.sender.username,
          };
          const newMap = new Map(messages);
          newMap.set(messageId, messageObjWithoutId);
          setMessages(newMap);
          scrollToBottom();
        } else {
          const newMap = new Map(messages);
          setMessages(newMap);
        }
      } else {
        setMessages([]);
      }
    });
    // eslint-disable-next-line
  }, [socket, messages]);


  /* helpers functions */

  function parseDate(dateTimeString) {
    const date = new Date(dateTimeString).toLocaleDateString();
    return date;
  }

  function parseTime(dateTimeString) {
    const time = new Date(dateTimeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return time;
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatScreenBottom = document.querySelector("#chat");
      if (chatScreenBottom !== null) {
        chatScreenBottom.scrollTop = chatScreenBottom.scrollHeight;
      }
    }, 50);
  };

  const getDisplayNameFromContact = (username) => {
    const contactArr = contactList.getContacts();
    for (let i = 0; i < contactArr.length; i++) {
      if (contactArr[i].getUserName() === username) {
        return contactArr[i].getDisplayName();
      }
    }
    return "";
  };

  return selectedContact !== "" ? (
    <main>
      <div>
        <ChatBoxHeader
          userName={
            selectedContact !== "" ?
              contactList.getContacts().find((contact) => contact.userName === selectedContact).getUserName() : ""
          }
          displayName={
            selectedContact !== "" ?
              contactList.getContacts().find((contact) => contact.userName === selectedContact).getDisplayName() : ""
          }
          profilePic={
            selectedContact !== "" ?
              contactList.getContacts().find((contact) => contact.userName === selectedContact).getProfilePic() : ""
          }
          currentUser={currentUser}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          setFilterDisplay={setFilterDisplay}
          contactList={contactList}
          setContactList={setContactList}
          socket={socket}
        />
        <ul id="chat">
          {messages.size > 0 ? (
            Array.from(messages.entries()).map((entry) => {
              const [key, message] = entry;
              return message.sender === currentUser.getUserName() ? (
                <MeMessage
                  key={key}
                  messageTime={message.time}
                  messageDate={message.date}
                  message={message.messageContent}
                />
              ) : (
                <YouMessage
                  key={key}
                  displayName={getDisplayNameFromContact(message.sender)}
                  messageTime={message.time}
                  messageDate={message.date}
                  message={message.messageContent}
                />
              );
            })
          ) : (
            <div className="empty-chat" id="empty-chat">
              <link
                href="https://fonts.googleapis.com/css?family=Baloo+2:400,800&display=swap"
                rel="stylesheet"
              />
              <p>
                Don't let the chat stay empty,
                <br />
                start a conversation now!
              </p>
            </div>
          )}
        </ul>
        <ChatBoxFooter onSend={handleSend} />
      </div>
    </main>
  ) : (
    <main
      style={{
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={welcomePic}
          alt="welcome"
          style={{ width: "200px", height: "200px" }}
        />
        <h1 style={{ fontSize: "36px", margin: "20px 0" }}>OG Web Chat</h1>
        <p style={{ fontSize: "18px" }}>
          Welcome to our chat app! <br />
          Thank you for choosing our app to stay connected with your friends and
          family. <br />
          Feel free to explore our app and start chatting!
        </p>
      </div>
    </main>
  );
}

export default ChatBox;
