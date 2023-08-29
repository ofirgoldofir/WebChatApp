import AsideContact from "./AsideContact";

function ContactListResult({
  currentUser,
  filterDisplay,
  selectedContact,
  setSelectedContact,
  newMessageFlag,
  socket,
}) {
  const handleContactClick = (userName) => {
    setSelectedContact(userName);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      const chatScreenBottom = document.querySelector("#chat");
      chatScreenBottom.scrollTop = chatScreenBottom.scrollHeight;
    }, 50);
  };

  const asideContactList = filterDisplay.map((contact, key) => {
    return (
      <AsideContact
        {...contact}
        key={contact.userName}
        onClick={() => handleContactClick(contact.getUserName())}
        currentUser={currentUser}
        selectedContact={selectedContact}
        newMessageFlag={newMessageFlag}
        socket={socket}
      />
    );
  });

  return <ul className="contact-list-ul">{asideContactList}</ul>;
}
export default ContactListResult;
