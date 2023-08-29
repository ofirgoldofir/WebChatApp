import React from "react";
import SignUpForm from "./SignUpForm.js";
import SignInForm from "./SignInForm.js";
import OverlayCont from "./OverlayCont.js";


const LogAndReg = ({
  handleUserChange,
  handleUserListChange,
  socket,
}) => {
  return (
      <div className="LogAndReg">
        <style>
        {`
          body {
            background: #f6f5f7;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-family: 'Montserrat', sans-serif;
            height: 100vh;
            margin: -20px 0 50px;
          }
        `}
      </style>
        <h2>Login or Register</h2>
        <div className="container" id="container">
          <div className="form-container sign-up-container">
          <SignUpForm
            handleUserListChange={handleUserListChange}
          />
          </div>
          <div className="form-container sign-in-container">
          <SignInForm
            handleUserChange={handleUserChange}
            socket={socket}
          />
          </div>
          <OverlayCont />
        </div>
      </div>
  );
};

export default LogAndReg;
