import apiRequests from "../../../data/apiRequests";
import { useEffect, useState } from "react";
import notification from "../../../icons/new-message.png"
function AsideContact({
  userName,
  displayName,
  profilePic,
  onClick,
  currentUser,
  selectedContact,
  newMessageFlag,
  socket,
}) {
  const [lastMessage, setLastMessage] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState("");
  const [lastMessageDate, setLastMessageDate] = useState("");
  const [unreadMessage, setUnreadMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiReq = await apiRequests(currentUser);
      setLastMessage(await apiReq.apiGetContactLastMessageContent(userName));
      setLastMessageTime(await apiReq.apiGetContactLastMessageTime(userName));
      setLastMessageDate(await apiReq.apiGetContactLastMessageDate(userName));
    };
    fetchData();
  }, [currentUser, userName, newMessageFlag]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.message.sender.username === userName) {
        setUnreadMessage(true);
        setLastMessage(data.message.messageContent);
        setLastMessageTime(data.message.time);
        setLastMessageDate(data.message.date);
      }
    });
    // eslint-disable-next-line
  }, [socket]);


  useEffect(() => {
    if (selectedContact === userName) {
      setUnreadMessage(false);
    }
    // eslint-disable-next-line
  }, [selectedContact]);

  return (
    <li className="contact-list-li" onClick={onClick}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-11">
                <div className="row">
                  <div className="col-6" style={{ width: 65 }}>
                    <img
                      className="circle-profile-pics"
                      src={profilePic}
                      alt="profile-pic"
                    />
                  </div>
                  <div className="col-6">
                    <div className="row">
                      <div className="col-12">
                        <h2>{displayName}</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <h3 style={{ direction: "rtl" }}>{lastMessage}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-1 d-flex justify-content-end last-message">
                <h4>
                  {lastMessageDate}
                  <br />
                  {lastMessageTime}
                </h4>
                {unreadMessage === false ? <div></div> : <img className="menu-icon unread-messages" src={notification} alt="notification" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
export default AsideContact;
