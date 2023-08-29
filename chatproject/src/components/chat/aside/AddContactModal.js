import peopleChatting from "../../../images/peopleChatting.jpg"
function AddContactModal({
    userNameToAdd,
    handleInputChange,
    handleAddContact,
    closeAddContactModal,
    showAddContactFailureAlert,
    showAddContactSuccessAlert,
    addContactAlertContentFailure,
    addContactAlertContentSuccess,
}) {

    return (
        <>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Add new contact
                </h1>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <div className="modal-body">
                <img alt="user-pic" src={peopleChatting} />
                {/* <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="">Looking for a specific contact? Enter their identity here:</option>
                    {Array.from(optionsList, ([key, value]) => (
                        <option key={key} value={value} data-key={key}>
                            {value}
                        </option>
                    ))}
                </select> */}
                <input className="search-contact-text" type="text" placeholder="search" value={userNameToAdd} onChange={handleInputChange} />
                <br />
                <br />
                {showAddContactSuccessAlert && (
                    <div className="alert alert-success d-flex align-items-center fade show" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use href="#check-circle-fill" /></svg>
                        <div><span>{addContactAlertContentSuccess}</span></div>
                    </div>
                )}
                {showAddContactFailureAlert && (
                    <div className="alert alert-danger  d-flex align-items-center fade show" role="alert">
                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use href="#exclamation-triangle-fill" /></svg>
                        <div><span>{addContactAlertContentFailure}</span></div>
                    </div>
                )}
            </div>
            <div className="modal-footer">
                <button
                    id="cancel-button-new-contact"
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={closeAddContactModal}>
                    Cancel
                </button>
                <button
                    id="add-button-new-contact"
                    type="button"
                    className="btn btn-primary"
                    // data-bs-dismiss="modal"
                    onClick={handleAddContact}>
                    Add
                </button>
            </div>
        </>
    );
}
export default AddContactModal;