
import audio from '../../../icons/audio.png';
import video from '../../../icons/video.png';
import search from '../../../icons/search.png';
import apiRequests from '../../../data/apiRequests';
function ChatBoxHeader({
    userName,
    displayName,
    profilePic,
    currentUser,
    selectedContact,
    setSelectedContact,
    setFilterDisplay,
    contactList,
    setContactList,
    socket,
}) {

    const handleDeleteChat = async (e) => {
        const apiReq = await apiRequests(currentUser);
        await apiReq.apiDeleteChat(userName);
        const resGetChats = await apiReq.apiGetChats();
        const contactsAfterConvertFromJSON = await apiReq.convertJSONToContacts(resGetChats);
        setContactList(contactsAfterConvertFromJSON);
        setSelectedContact("");
        // setFilterDisplay(contactsAfterConvertFromJSON.getContacts());
        socket.emit("delete_contact", {
            contactToDelete: userName,
            deleter: currentUser.getUserName(),
        });
    }

    return (
        <header>
            <div className="row py-3">
                <div className="col-2 px-3 col-lg-1 align-items-center justify-content-end">
                    <img className="circle-profile-pics current-chat-profile-pic"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample"
                        src={profilePic} alt="" />
                    {/* Off canvas bootstrap - Contact Info */}
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div className="offcanvas-header">
                            <h3 className="offcanvas-title" id="offcanvasExampleLabel" style={{ textAlign: 'center' }}>Contact Info</h3>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <img className="circle-profile-pics current-chat-profile-pic" src={profilePic} alt=""
                                style={{
                                    display: 'block',
                                    margin: '0 auto',
                                    width: '150px',
                                    height: '150px',
                                }} />
                            <h2 style={{ fontSize: '24px', textAlign: 'center', marginTop: '25px' }}>{displayName}</h2>
                            {/* audio video search */}
                            <div className="container-fluid" style={{ marginTop: "15%" }}>
                                <div className="row">
                                    <div className="col-4  d-flex flex-column align-items-center">
                                        <img type="button" alt="audio" src={audio} style={{ width: "25px", height: "25px" }} />
                                        <h3>
                                            audio
                                        </h3>
                                    </div>
                                    <div className="col-4  d-flex flex-column align-items-center">
                                        <img type="button" alt="video" src={video} style={{ width: "25px", height: "25px" }} />
                                        <h3>
                                            video
                                        </h3>
                                    </div>
                                    <div className="col-4  d-flex flex-column align-items-center">
                                        <img type="button" alt="search" src={search} style={{ width: "25px", height: "25px" }} />
                                        <h3>
                                            search
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="container-fluid">
                                {/* archive contact */}
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-center">
                                        <button type="button" className="btn btn-outline-warning"
                                            style={{ width: '100%', marginBottom: '10px' }}>Archived {displayName}</button>
                                    </div>
                                </div>
                                {/* report  contact */}
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-center">
                                        <button type="button" className="btn btn-outline-danger"
                                            style={{ width: '100%', marginBottom: '10px' }}>report {displayName}</button>
                                    </div>
                                </div>
                                {/* block contact */}
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-center">
                                        <button type="button" className="btn btn-outline-danger"
                                            style={{ width: '100%', marginBottom: '10px' }}>block {displayName}</button>
                                    </div>
                                </div>
                                {/* delete contact */}
                                <div className="row">
                                    <div className="col-md-12 d-flex justify-content-center">
                                        <button type="button" className="btn btn-outline-danger"
                                            style={{ width: '100%' }} onClick={handleDeleteChat}>delete chat</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 col-lg-9 d-flex align-items-center justify-content-start flex-row">
                    <h2 className="text-left mx-0 my-0 ms-md-0 ms-3">{displayName}</h2>
                </div>
            </div>
        </header>
    );
}
export default ChatBoxHeader;