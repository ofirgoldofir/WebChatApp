
import { useState, useEffect } from "react";
// import { users } from "../../../data/users";
import { useNavigate } from "react-router-dom";

function SettingsModal({ closeSettingsModal, currentUser, setCurrentUserDisplayName, currentUserImage, setCurrentUserImage }) {

    // Change password functionality
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPasswordSuccessAlert, setShowPasswordSuccessAlert] = useState(false);
    const [showPasswordFailureAlert, setShowPasswordFailureAlert] = useState(false);
    const [passwordAlertContent, setPasswordAlertContent] = useState('');

    const handleConfirmChangePassword = () => {
        setPasswordError("");
        setConfirmPasswordError("");
        if (oldPassword !== currentUser.getPassword()) {
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordFailureAlert(true);
            setPasswordAlertContent("Old password is incorrect");
            return;
        } else {
            if (passwordError) {
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowPasswordFailureAlert(true);
                setPasswordAlertContent(passwordError);
                return;
            }
            if (confirmPasswordError) {
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setShowPasswordFailureAlert(true);
                setPasswordAlertContent(confirmPasswordError);
                return;
            }
            setShowPasswordSuccessAlert(true);
            setPasswordAlertContent("Password changed successfully");
            currentUser.setPassword(newPassword);
        }
        // Reset the input fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    }

    const handleNewPasswordChange = (event) => {
        const newPassword = event.target.value;
        setNewPassword(newPassword);
        validateNewPassword(newPassword);
    }

    const handleConfirmNewPasswordChange = (event) => {
        const confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
        validateConfirmPassword(confirmPassword);
    }

    const validateNewPassword = (newPassword) => {
        let passwordErrorTemp = "";
        if (newPassword.length < 8) {
            passwordErrorTemp = "Password must be at least 8 characters long";
        } else if (!/\d/.test(newPassword)) {
            passwordErrorTemp = "Password must contain at least one number";
        } else if (!/[a-zA-Z]/.test(newPassword)) {
            passwordErrorTemp = "Password must contain at least one letter";
        }
        setPasswordError(passwordErrorTemp);
    };

    const validateConfirmPassword = (confirmPassword) => {
        const confirmPasswordErrorTemp =
            newPassword !== confirmPassword ? "Passwords do not match" : "";
        setConfirmPasswordError(confirmPasswordErrorTemp);
    };

    useEffect(() => {
        if (showPasswordSuccessAlert) {
            const timeout = setTimeout(() => {
                setShowPasswordSuccessAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
        if (showPasswordFailureAlert) {
            const timeout = setTimeout(() => {
                setShowPasswordFailureAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
    }, [showPasswordSuccessAlert, showPasswordFailureAlert]);
    // End of change password functionality

    // Change display name functionality
    const [displayName, setDisplayName] = useState('');
    const [passwordDisplayName, setPasswordDisplayName] = useState('');
    const [showDisplayNameSuccessAlert, setShowDisplayNameSuccessAlert] = useState(false);
    const [showDisplayNameFailureAlert, setShowDisplayNameFailureAlert] = useState(false);
    const [DisplayNameAlertContent, setDisplayNameAlertContent] = useState("");

    const handleConfirmChangeDisplayName = () => {
        setDisplayName('');
        setPasswordDisplayName('');
        if (passwordDisplayName !== currentUser.getPassword()) {
            setShowDisplayNameFailureAlert(true);
            setDisplayNameAlertContent("Password is incorrect");
        } else {
            // add functionality to change display name
            currentUser.setDisplayName(displayName);
            setCurrentUserDisplayName(displayName);
            changeDisplayNameInContactsList();
            setShowDisplayNameSuccessAlert(true);
            setDisplayNameAlertContent("Display name changed successfully");
        }
    }

    const changeDisplayNameInContactsList = () => {
        // add functionality to change display name
    }

    const handleDisplayNameChange = (event) => {
        const displayName = event.target.value;
        setDisplayName(displayName);
    }

    const handlePasswordDisplayNameChange = (event) => {
        const password = event.target.value;
        setPasswordDisplayName(password);
    }

    useEffect(() => {
        if (showDisplayNameSuccessAlert) {
            const timeout = setTimeout(() => {
                setShowDisplayNameSuccessAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
        if (showDisplayNameFailureAlert) {
            const timeout = setTimeout(() => {
                setShowDisplayNameFailureAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
    }, [showDisplayNameSuccessAlert, showDisplayNameFailureAlert]);
    // End of change display name functionality

    // Change profile picture functionality
    const [profilePic, setProfilePic] = useState(null);
    const [showProfilePicSuccessAlert, setShowProfilePicSuccessAlert] = useState(false);
    const [showProfilePicFailureAlert, setShowProfilePicFailureAlert] = useState(false);
    const [profilePicAlertContent, setProfilePicAlertContent] = useState('');
    const [profilePicError, setProfilePicError] = useState('');

    const handleConfirmChangeProfilePic = () => {
        if (profilePicError) {
            setShowProfilePicFailureAlert(true);
            setProfilePicAlertContent(profilePicError);
            return;
        }
        if (profilePic) {
            setShowProfilePicSuccessAlert(true);
            setProfilePicAlertContent("Profile picture changed successfully");
            setCurrentUserImage(profilePic);
            currentUser.setImage(profilePic);
        }
    }

    const handleImageChange = (event) => {
        setProfilePic(null);
        setProfilePicError("");
        const fileTypes = [
            "image/apng",
            "image/bmp",
            "image/gif",
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/svg+xml",
            "image/tiff",
            "image/webp",
            "image/x-icon"
        ];
        const file = event.target.files[0];

        if (file) {
            if (fileTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = () => {
                    setProfilePic(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setProfilePicError(`${file.name}: File type is not supported`);
            }
        }
    };

    useEffect(() => {
        if (showProfilePicSuccessAlert) {
            const timeout = setTimeout(() => {
                setShowProfilePicSuccessAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
        if (showProfilePicFailureAlert) {
            const timeout = setTimeout(() => {
                setShowProfilePicFailureAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
    }, [showProfilePicSuccessAlert, showProfilePicFailureAlert]);
    // End of change profile picture functionality

    // delete account functionality
    const navigate = useNavigate();
    const [passwordForDeleteAccount, setPasswordForDeleteAccount] = useState('');
    const [showPasswordForDeleteAccountFailureAlert, setShowPasswordForDeleteAccountFailureAlert] = useState(false);
    const [showPasswordForDeleteAccountConfirmAlert, setShowPasswordForDeleteAccountConfirmAlert] = useState(false);
    const [deleteAccountAlertContent, setDeleteAccountAlertContent] = useState("");

    const handleConfirmDeleteAccount = () => {
        if (passwordForDeleteAccount !== currentUser.getPassword()) {
            setPasswordForDeleteAccount('');
            setShowPasswordForDeleteAccountFailureAlert(true);
            setDeleteAccountAlertContent("Password is incorrect");
            return;
        } else {
            setPasswordForDeleteAccount('');
            setShowPasswordForDeleteAccountConfirmAlert(true);
            setDeleteAccountAlertContent("Are you sure you want to delete your account? This action is irreversible and will permanently remove all your data.");
        }
    }
    const finalDeleting = () => {
        // add functionality to delete account
        // console.log("delete account");
        navigate('/');
    }

    const cancelFinalDeleting = () => {
        setShowPasswordForDeleteAccountConfirmAlert(false);
    }

    const handlePasswordForDeleteAccountChange = (event) => {
        const password = event.target.value;
        setPasswordForDeleteAccount(password);
    }

    useEffect(() => {
        if (showPasswordForDeleteAccountFailureAlert) {
            const timeout = setTimeout(() => {
                setShowPasswordForDeleteAccountFailureAlert(false);
            }, 4000);

            return () => clearTimeout(timeout);
        }
    }, [showPasswordForDeleteAccountFailureAlert]);
    // End of delete account functionality

    const handleCloseSettingsModal = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setConfirmPasswordError('');
        setShowPasswordSuccessAlert(false);
        setShowPasswordFailureAlert(false);
        setPasswordAlertContent('');
        setDisplayName('');
        setPasswordDisplayName('');
        setShowDisplayNameSuccessAlert(false);
        setShowDisplayNameFailureAlert(false);
        setDisplayNameAlertContent('');
        setProfilePic(null);
        setShowProfilePicSuccessAlert(false);
        setShowProfilePicFailureAlert(false);
        setProfilePicAlertContent('');
        setProfilePicError('');
        setPasswordForDeleteAccount('');
        setShowPasswordForDeleteAccountFailureAlert(false);
        setShowPasswordForDeleteAccountConfirmAlert(false);
        setDeleteAccountAlertContent('');
    }

    return (
        <>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                    Settings
                </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseSettingsModal} />
            </div>
            <div className="modal-body">
                {/* change display name */}
                <div className="row">
                    <div className="card" type="button" data-bs-toggle="collapse" data-bs-target="#changeDisplayName" aria-expanded="false" aria-controls="collapseExample">
                        <div className="card-body">
                            Change display name
                        </div>
                    </div>
                    <div className="collapse" id="changeDisplayName">
                        <div className="card card-body">
                            <h1>Change display name</h1>
                            <p>Your current display name is: <span id="currentDisplayName">{currentUser.getDisplayName()}</span></p>
                            <div className="form-floating mb-3">
                                <input value={displayName} onChange={handleDisplayNameChange} type="text" className="form-control" id="floatingInputChangeDisplayName" placeholder="displayname" />
                                <label htmlFor="floatingInputChangeDisplayName">New display name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={passwordDisplayName} onChange={handlePasswordDisplayNameChange} type="password" className="form-control" id="floatingPasswordChangeDisplayName" placeholder="Password" />
                                <label htmlFor="floatingPasswordChangeDisplayName">Password</label>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-end align-items-center">
                                    <button type="button" className="btn btn-success" onClick={handleConfirmChangeDisplayName}>Confirm</button>
                                </div>
                            </div>
                            <br />
                            {showDisplayNameSuccessAlert && (
                                <div className="alert alert-success d-flex align-items-center fade show" role="alert">
                                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use href="#check-circle-fill" /></svg>
                                    <div><span>{DisplayNameAlertContent}</span></div>
                                </div>
                            )}
                            {showDisplayNameFailureAlert && (
                                <div className="alert alert-danger  d-flex align-items-center fade show" role="alert">
                                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use href="#exclamation-triangle-fill" /></svg>
                                    <div><span>{DisplayNameAlertContent}</span></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* change password */}
                <div className="row">
                    <div className="card" type="button" data-bs-toggle="collapse" data-bs-target="#changePassword" aria-expanded="false" aria-controls="collapseExample">
                        <div className="card-body">
                            Change password
                        </div>
                    </div>
                    <div className="collapse" id="changePassword">
                        <div className="card card-body">
                            <h1>Change password</h1>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingInputChangePassword" placeholder="oldPassword"
                                    value={oldPassword} onChange={handleOldPasswordChange} />
                                <label htmlFor="floatingInputChangePassword">Old password</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingPasswordChangePassword" placeholder="newPassword"
                                    value={newPassword} onChange={handleNewPasswordChange} />
                                <label htmlFor="floatingPasswordChangePassword">New password</label>
                            </div>
                            {passwordError && <div className="error-in-change-password">{passwordError}</div>}
                            <div className="form-floating mb-3">
                                <input type="password" className="form-control" id="floatingConfirmPasswordChangePassword"
                                    placeholder="newPasswordConfirm"
                                    value={confirmPassword} onChange={handleConfirmNewPasswordChange} />
                                <label htmlFor="floatingPasswordChangePassword">New password confirm</label>
                            </div>
                            {confirmPasswordError && (<div className="error-in-change-password">{confirmPasswordError}</div>)}
                            <div className="row">
                                <div className="col-12 d-flex justify-content-end align-items-center">
                                    <button type="button" className="btn btn-success" onClick={handleConfirmChangePassword}>Confirm</button>
                                </div>
                            </div>
                            <br />
                            {showPasswordSuccessAlert && (
                                <div className="alert alert-success d-flex align-items-center fade show" role="alert">
                                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use href="#check-circle-fill" /></svg>
                                    <div><span>{passwordAlertContent}</span></div>
                                </div>
                            )}
                            {showPasswordFailureAlert && (
                                <div className="alert alert-danger  d-flex align-items-center fade show" role="alert">
                                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use href="#exclamation-triangle-fill" /></svg>
                                    <div><span>{passwordAlertContent}</span></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* change profile picture */}
                <div className="row">
                    <div className="card" type="button" data-bs-toggle="collapse" data-bs-target="#changeProfilePic" aria-expanded="false" aria-controls="collapseExample">
                        <div className="card-body">
                            Change profile picture
                        </div>
                    </div>
                    <div className="collapse" id="changeProfilePic">
                        <div className="card card-body">
                            <h1>Change profile picture</h1>
                            <label>Your current profile picture is:</label>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center align-items-center">
                                    {profilePicError ? (
                                        <p className="error-in-upload-photo">{profilePicError}</p>
                                    ) : (
                                        <>
                                            {profilePic ? (
                                                <img style={{ width: '150px', height: '150px' }}
                                                    className="circle-profile-pics"
                                                    src={profilePic} alt="Preview" />
                                            ) : (
                                                <img style={{ width: '150px', height: '150px' }}
                                                    className="circle-profile-pics"
                                                    src={currentUserImage} alt="Default Preview" />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Upload new one</label>
                                <input className="form-control" type="file" id="formFile" onChange={handleImageChange} />
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-end align-items-center">
                                    <button type="button" className="btn btn-success" onClick={handleConfirmChangeProfilePic} >Confirm</button>
                                </div>
                            </div>
                            <br />
                            {showProfilePicSuccessAlert && (
                                <div className="alert alert-success d-flex align-items-center fade show" role="alert">
                                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use href="#check-circle-fill" /></svg>
                                    <div><span>{profilePicAlertContent}</span></div>
                                </div>
                            )}
                            {showProfilePicFailureAlert && (
                                <div className="alert alert-danger  d-flex align-items-center fade show" role="alert">
                                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use href="#exclamation-triangle-fill" /></svg>
                                    <div><span>{profilePicAlertContent}</span></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* delete account */}
                <div className="row">
                    <div className="card" type="button" data-bs-toggle="collapse" data-bs-target="#deleteAccount" aria-expanded="false" aria-controls="collapseExample">
                        <div className="card-body">
                            Delete account
                        </div>
                    </div>
                    <div className="collapse" id="deleteAccount">
                        <div className="card card-body">
                            <h1>Delete account</h1>
                            <p>Are you sure you want to delete your account? This action is irreversible and will permanently delete all your data.</p>
                            <p>Please consider the following before proceeding:</p>
                            <ul>
                                <li>All your personal information, including profile data, messages, and settings, will be permanently deleted.</li>
                                <li>You will no longer have access to your account and will be logged out immediately.</li>
                                <li>You will lose any connections or relationships you have established within the platform.</li>
                            </ul>
                            <p>If you still wish to proceed, please enter your account password to confirm the deletion:</p>

                            <div className="form-floating mb-3">
                                <input value={passwordForDeleteAccount} onChange={handlePasswordForDeleteAccountChange}
                                    type="password" className="form-control" id="floatingPasswordDeleteAccount" placeholder="passwordBeforeDelete" />
                                <label htmlFor="floatingPasswordDeleteAccount">Enter your password</label>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-end align-items-center">
                                    <button type="button" className="btn btn-success" onClick={handleConfirmDeleteAccount}>Confirm</button>
                                </div>
                            </div>
                            <br />
                            {showPasswordForDeleteAccountFailureAlert && (
                                <div className="alert alert-danger  d-flex align-items-center fade show" role="alert">
                                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use href="#exclamation-triangle-fill" /></svg>
                                    <div><span>{deleteAccountAlertContent}</span></div>
                                </div>
                            )}
                            {showPasswordForDeleteAccountConfirmAlert && (
                                <>
                                    <div className="alert alert-warning  d-flex align-items-center fade show" role="alert">
                                        <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use href="#exclamation-triangle-fill" /></svg>
                                        <div><span>{deleteAccountAlertContent}</span></div>
                                        <button type="button" className="btn btn-danger" onClick={cancelFinalDeleting} data-bs-dismiss="alert" aria-label="Close">No</button>
                                        <button type="button" className="btn btn-success" onClick={finalDeleting}
                                            data-bs-dismiss="modal" aria-label="Close">Yes</button>
                                    </div>

                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
            </div>
        </>
    );

}
export default SettingsModal;