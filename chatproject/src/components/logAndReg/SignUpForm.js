import React, { useState, useEffect } from "react";
import { users } from "../../data/users.js";
import defaultImage from "../../images/default.jpg";
import user from "../../data/user.js";
import Contacts from "../../data/Contacts.js";
import apiRequests from "../../data/apiRequests.js";
import defaultBase64 from "../../images/defaultBase64.txt";

const SignUpForm = ({ handleUserListChange }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);
  const [defaultImageSrc] = useState(defaultImage);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);

  //const defaultImageBase64 =

  const handleUsernameChange = (event) => {
    const username = event.target.value;
    if (username.includes(" ")) {
      setUsernameError("Username cannot contain spaces");
    } else {
      setUsername(username);
      setUsernameError("");
    }
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
    validatePassword(password);
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
    validateConfirmPassword(confirmPassword);
  };

  const handleDisplayNameChange = (event) => {
    const displayName = event.target.value;
    setDisplayName(displayName);
  };

  const handleImageChange = (event) => {
    setImage(null);
    setErrorMessage("");
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
      "image/x-icon",
    ];
    const file = event.target.files[0];

    if (file) {
      if (fileTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setErrorMessage(`${file.name}: File type is not supported`);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password || !confirmPassword || !displayName) {
      setShowAlert3(true);
      return;
    }

    if (username.indexOf(" ") !== -1) {
      setShowAlert3(true);
      return;
    }

    if (password !== confirmPassword) {
      setShowAlert3(true);
      return;
    }

    if (password.length < 8) {
      setShowAlert3(true);
      return;
    }

    if (!/\d/.test(password)) {
      setShowAlert3(true);
      return;
    }

    if (!/[a-zA-Z]/.test(password)) {
      setShowAlert3(true);
      return;
    }
    let imageData;
    if (image == null) {
      try {
        const response = await fetch(defaultBase64);
        const content = await response.text();
        imageData = content;
      } catch (error) {
        console.error("Error reading file:", error);
      }
    } else {
      imageData = image;
    }
    const newUser = new user(
      username,
      password,
      displayName,
      imageData,
      new Contacts()
    );

    const apireq = await apiRequests(newUser);
    const res = await apireq.apiPostUser();

    if (res.status === 409) {
      setShowAlert2(true);
      return;
    } else if (res.status !== 200) {
      setShowAlert3(true);
      return;
    } else {
      users.push(newUser);
      handleUserListChange(users);

      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setDisplayName("");
      setImage(null);
      setShowAlert1(true);
    }
  };

  const validatePassword = (password) => {
    let passwordError = "";
    if (password.length < 8) {
      passwordError = "Password must be at least 8 characters long";
    } else if (!/\d/.test(password)) {
      passwordError = "Password must contain at least one number";
    } else if (!/[a-zA-Z]/.test(password)) {
      passwordError = "Password must contain at least one letter";
    }
    setPasswordError(passwordError);
  };

  const validateConfirmPassword = (confirmPassword) => {
    const confirmPasswordError =
      password !== confirmPassword ? "Passwords do not match" : "";
    setConfirmPasswordError(confirmPasswordError);
  };

  useEffect(() => {
    if (showAlert1) {
      const timeout = setTimeout(() => {
        setShowAlert1(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
    if (showAlert2) {
      const timeout = setTimeout(() => {
        setShowAlert2(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
    if (showAlert3) {
      const timeout = setTimeout(() => {
        setShowAlert3(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [showAlert1, showAlert2, showAlert3]);

  return (
    <form action="#" noValidate onSubmit={handleSubmit}>
      {showAlert1 && (
        <div
          className="alert alert-success d-flex align-items-center fade show"
          role="alert"
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Success:"
          >
            <use href="#check-circle-fill" />
          </svg>
          <div>
            <span>Successfully registered!</span>
          </div>
        </div>
      )}
      {showAlert2 && (
        <div
          className="alert alert-warning d-flex align-items-center"
          role="alert"
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Warning:"
          >
            <use href="#exclamation-triangle-fill" />
          </svg>
          <div>
            <span>User already exists</span>
          </div>
        </div>
      )}
      {showAlert3 && (
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Danger:"
          >
            <use href="#exclamation-triangle-fill" />
          </svg>
          <div>
            <span>Please fill all required fields</span>
          </div>
        </div>
      )}
      <h1>Sign Up</h1>
      <div>
        <span>Create Account</span>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
        {usernameError && <div className="error">{usernameError}</div>}
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <div className="error">{passwordError}</div>}
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirm_password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {confirmPasswordError && (
          <div className="error">{confirmPasswordError}</div>
        )}
        <input
          type="text"
          placeholder="Display name"
          id="displayName"
          value={displayName}
          onChange={handleDisplayNameChange}
        />
        <input
          type="file"
          id="image_uploads"
          name="image_uploads"
          multiple
          onChange={handleImageChange}
        />
      </div>
      <div className="preview">
        {errorMessage ? (
          <p className="error">{errorMessage}</p>
        ) : (
          <>
            {image ? (
              <img src={image} alt="Preview" />
            ) : (
              <img src={defaultImageSrc} alt="Default Preview" />
            )}
          </>
        )}
      </div>
      <div>
        <button>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
