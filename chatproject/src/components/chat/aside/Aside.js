import AsideHeader from "./AsideHeader";
import ContactListResult from "./ContactListResult";
function Aside({
    setContactList,
    contactList,
    setSelectedContact,
    selectedContact,
    currentUser,
    filterDisplay,
    setFilterDisplay,
    newMessageFlag,
    socket
}) {

    const doSearch = function (q) {
        setFilterDisplay(contactList.getContacts().filter((contact) => {
            const words = [...contact.displayName.split(' ')];
            const match = words.find((word) => word.toLowerCase().startsWith(q.toLowerCase()));
            return match !== undefined;
        }));
    }

    return (
        <aside>
            <AsideHeader
                setSearchQuery={doSearch}
                currentUser={currentUser}
                setContactList={setContactList}
                socket={socket}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                setFilterDisplay={setFilterDisplay}
                contactList={contactList}
            />
            <ContactListResult
                currentUser={currentUser}
                filterDisplay={filterDisplay}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                newMessageFlag={newMessageFlag}
                socket={socket}
            />
        </aside>
    );
}
export default Aside;
