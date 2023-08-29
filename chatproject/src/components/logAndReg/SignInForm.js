import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequests from "../../data/apiRequests.js";
import User from "../../data/user.js";
import Contacts from "../../data/Contacts.js";

const SignInForm = ({
  handleUserChange,
  socket
}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const foundUserTemp = new User(username, password, null, null);
    const apiReq = await apiRequests(foundUserTemp);
    const resToken = await apiReq.apiToken();
    if (resToken === null) {
      setShowAlert(true);
      setUsername("");
      setPassword("");
    } else {
      const foundUserAPI = await apiReq.apiGetUser(username);
      if (foundUserAPI === null) {
        setShowAlert(true);
        setUsername("");
        setPassword("");
      } else {
        socket.emit("join_room", username);
        const foundUserAPIObj = new User(
          foundUserAPI.username,
          foundUserAPI.password,
          foundUserAPI.displayName,
          foundUserAPI.profilePic,
          new Contacts()
        );
        handleUserChange(foundUserAPIObj);
        navigate("/chat");
      }
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  return (
    <form onSubmit={handleFormSubmit}>
      {showAlert && (
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
            <span>Invalid username or password</span>
          </div>
        </div>
      )}
      <h1>Sign in</h1>
      <br />
      <span>use your account</span>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange}
      />
      <br />
      <button>Sign In</button>
    </form>
  );
};

export default SignInForm;
