import SearchContact from "./SearchContact";
import addNewContact from "../../../icons/addNewContact.png"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logout from "../../../icons/logout1.png"
import settingsIcon from "../../../icons/settings.png"
import archived from "../../../icons/archived.png"
import menu from "../../../icons/menu.png"
import newGroup from "../../../icons/newGroup1.png"
import help from "../../../icons/help.png"
import SettingsModal from "./SettingsModal";
import AddContactModal from "./AddContactModal";
import HelpModal from "./HelpModal";
import apiRequests from "../../../data/apiRequests";

function AsideHeader({
    setSearchQuery,
    currentUser,
    setContactList,
    socket,
    selectedContact,
    setSelectedContact,
    setFilterDisplay,
    contactList,

}) {

    const navigate = useNavigate();
    const [userNameToAdd, setUserNameToAdd] = useState('');
    const [currentUserDisplayName, setCurrentUserDisplayName] = useState(currentUser.getDisplayName());
    const [currentUserImage, setCurrentUserImage] = useState(currentUser.getImage());

    const handleInputChange = (e) => {
        setUserNameToAdd(e.target.value);
    };

    const [showAddContactFailureAlert, setShowAddContactFailureAlert] = useState(false);
    const [showAddContactSuccessAlert, setShowAddContactSuccessAlert] = useState(false);
    const [addContactAlertContentSuccess, setAddContactAlertContentSuccess] = useState("");
    const [addContactAlertContentFailure, setAddContactAlertContentFailure] = useState("");
    const handleAddContact = async (e) => {
        e.preventDefault();
        if (userNameToAdd === currentUser.getUserName()) {
            setShowAddContactFailureAlert(true);
            setAddContactAlertContentFailure("You can't add yourself");
            return;
        }
        const apiReq = await apiRequests(currentUser);
        const resAddContact = await apiReq.apiPostChat(userNameToAdd);
        if (resAddContact !== null) {
            setShowAddContactSuccessAlert(true);
            setAddContactAlertContentSuccess("User add successfully");
            const resGetChats = await apiReq.apiGetChats();
            const contactsAfterConvertFromJSON = await apiReq.convertJSONToContacts(resGetChats)
            setContactList(contactsAfterConvertFromJSON);
            socket.emit("add_contact", {
                newContactList: contactsAfterConvertFromJSON,
                newContact: userNameToAdd,
            });
        } else {
            setShowAddContactFailureAlert(true);
            setAddContactAlertContentFailure("User add failed");
        }
        setUserNameToAdd("");
    };

    const [addContactModal, setAddContactModal] = useState(false);

    const showAddContactModal = () => {
        setAddContactModal(true);
    };

    const closeAddContactModal = () => {
        setAddContactModal(false);
        setUserNameToAdd('');
    };

    const [settingsModal, setSettingsModal] = useState(false);

    const showSettingsModal = () => {
        setSettingsModal(true);
    };

    const closeSettingsModal = () => {
        setSettingsModal(false);
    };

    useEffect(() => {
        if (showAddContactSuccessAlert) {
            const timeout = setTimeout(() => {
                setShowAddContactSuccessAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
        if (showAddContactFailureAlert) {
            const timeout = setTimeout(() => {
                setShowAddContactFailureAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
    }, [showAddContactSuccessAlert, showAddContactFailureAlert]);

    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 d-flex justify-content-end align-items-center">
                        <img className="circle-profile-pics" alt="user-pic" src={currentUserImage} />
                    </div>
                    <div className="col-8 d-flex justify-content-start align-items-center">
                        <h2 id="hello-to-chat">Welcome, {currentUserDisplayName}</h2>
                    </div>
                    {/* dropdown */}
                    <div className="col-2 d-flex justify-content-end align-items-center" >
                        <div className="dropdown" aria-expanded="false">
                            <img src={menu} alt="menu"
                                className="dropdown-toggle menu-icon"
                                type="button" id="dropdownMenu2" data-bs-toggle="dropdown"
                                onClick={showAddContactModal} />
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                {/* Add contact */}
                                <li>
                                    <div className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#addNewContactModal">
                                        <div className="row">
                                            <div className="col-8 d-flex justify-content-center align-items-center">
                                                <span className="settings-text">New Chat</span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-start align-items-center">
                                                <img id="add-new-contact-icon" src={addNewContact} alt="Open modal" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                {/* New group */}
                                <li>
                                    <div className="dropdown-item" type="button">
                                        <div className="row">
                                            <div className="col-8 d-flex justify-content-center align-items-center">
                                                <span className="settings-text">New Group</span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-start align-items-center">
                                                <img className="menu-icon" src={newGroup} alt="newGroup" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                {/* Archived */}
                                <li>
                                    <div className="dropdown-item" type="button">
                                        <div className="row">
                                            <div className="col-8 d-flex justify-content-center align-items-center">
                                                <span className="settings-text">Archived</span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-start align-items-center">
                                                <img className="menu-icon" src={archived} alt="Archived" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                {/* settings */}
                                <li>
                                    <div className="dropdown-item"
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#settingsModal"
                                        onClick={showSettingsModal}>
                                        <div className="row">
                                            <div className="col-8 d-flex justify-content-center align-items-center">
                                                <span className="settings-text">Settings</span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-start align-items-center">
                                                <img className="menu-icon" src={settingsIcon} alt="settings" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                {/* Help */}
                                <li>
                                    <div className="dropdown-item" type="button"
                                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                                        <div className="row">
                                            <div className="col-8 d-flex justify-content-center align-items-center">
                                                <span className="logout-text">Help</span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-start align-items-center">
                                                <img className="menu-icon" src={help} alt="logout" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                {/* logout */}
                                <li>
                                    <div className="dropdown-item" type="button" onClick={() => navigate("/")}>
                                        <div className="row">
                                            <div className="col-8 d-flex justify-content-center align-items-center">
                                                <span className="logout-text">Logout</span>
                                            </div>
                                            <div className="col-4 d-flex justify-content-start align-items-center">
                                                <img className="menu-icon" src={logout} alt="logout" />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row py-1">
                    <div className="col-12">
                        <SearchContact doSearch={setSearchQuery} />
                    </div>
                </div>
                {/* Help center Modal */}
                <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                    <HelpModal />
                </div>
                {/* <!-- Settings Modal --> */}
                <div className="modal fade" id="settingsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-lg">
                        <div className="modal-content">
                            {settingsModal &&
                                <SettingsModal
                                    closeSettingsModal={closeSettingsModal}
                                    currentUser={currentUser}
                                    setCurrentUserDisplayName={setCurrentUserDisplayName}
                                    currentUserImage={currentUserImage}
                                    setCurrentUserImage={setCurrentUserImage}
                                />}
                        </div>
                    </div>
                </div>
                {/* add contact Modal */}
                <div
                    className="modal fade"
                    id="addNewContactModal"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {addContactModal &&
                                <AddContactModal
                                    closeAddContactModal={closeAddContactModal}
                                    userNameToAdd={userNameToAdd}
                                    handleInputChange={handleInputChange}
                                    handleAddContact={handleAddContact}
                                    showAddContactFailureAlert={showAddContactFailureAlert}
                                    showAddContactSuccessAlert={showAddContactSuccessAlert}
                                    addContactAlertContentFailure={addContactAlertContentFailure}
                                    addContactAlertContentSuccess={addContactAlertContentSuccess}
                                />}
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
}
export default AsideHeader;

