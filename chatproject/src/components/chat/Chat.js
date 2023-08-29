
import Aside from './aside/Aside';
import ChatBox from './chatBox/ChatBox';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Contacts from '../../data/Contacts';
import apiRequests from '../../data/apiRequests';
function Chat({ currentUser, userList, socket }) {

  const back = useNavigate();
  const [contactList, setContactList] = useState(new Contacts());
  const [filterDisplay, setFilterDisplay] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [newMessageFlag, setNewMessageFlag] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      back("/");
    } else {
      const fetchData = async () => {
        const apiReq = await apiRequests(currentUser);
        const chatsJson = await apiReq.apiGetChats();
        const contactListFromApi = await apiReq.convertJSONToContacts(chatsJson);
        setContactList(contactListFromApi);
        // setFilterDisplay(contactListFromApi.getContacts());
      }
      fetchData();
    }
  }, [currentUser, back]);

  useEffect(() => {
    setFilterDisplay(contactList.getContacts());
  }, [contactList]);

  useEffect(() => {
    socket.on("receive_add_contact", async (data) => {
      const apiReq = await apiRequests(currentUser);
      const resGetChats = await apiReq.apiGetChats();
      const contactsAfterConvertFromJSON = await apiReq.convertJSONToContacts(resGetChats)
      setContactList(contactsAfterConvertFromJSON);
      // setFilterDisplay(contactsAfterConvertFromJSON.getContacts());
    });
    socket.on("receive_delete_contact", async (data) => {
      const apiReq = await apiRequests(currentUser);
      const resGetChats = await apiReq.apiGetChats();
      const contactsAfterConvertFromJSON = await apiReq.convertJSONToContacts(resGetChats);
      setContactList(contactsAfterConvertFromJSON);
      // setFilterDisplay(contactsAfterConvertFromJSON.getContacts());
    });
    // eslint-disable-next-line
  }, [socket]);


  return (
    <>
      {
        currentUser && (
          <div className="row g-0 chat-container">
            <style>
              {`
              body {
                background: linear-gradient(to bottom, #67D89A, #34bea5);
                font-family: Arial;
                display: flex;
                flex-direction: column;
                height: 100vh;
                justify-content: center;
                align-items: center;
                margin: 0;
              }
            `}
            </style>
            <div className="col-12 col-sm-7 col-md-6 col-lg-4">
              <Aside
                setContactList={setContactList}
                contactList={contactList}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                currentUser={currentUser}
                filterDisplay={filterDisplay}
                setFilterDisplay={setFilterDisplay}
                newMessageFlag={newMessageFlag}
                socket={socket}
              />
            </div>
            <div className="col col-sm-5 col-md-6 col-lg-8">
              <ChatBox
                contactList={contactList}
                setContactList={setContactList}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                currentUser={currentUser}
                setFilterDisplay={setFilterDisplay}
                newMessageFlag={newMessageFlag}
                setNewMessageFlag={setNewMessageFlag}
                socket={socket}
              />
            </div>
          </div>
        )
      }
    </>
  );
}

export default Chat;


