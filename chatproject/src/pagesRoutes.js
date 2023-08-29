
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import LogAndReg from "./components/logAndReg/LogAndReg";
import Chat from "./components/chat/Chat.js";
import "./App.css";
import "./chat.css";
import { users } from "./data/users.js";

export const PagesRoutes = ({socket}) => {


    const [currentUser, setCurrentUser] = useState(null);
    const [userList, setUserList] = useState(users); 

    const handleUserListChange = (userList) => {
        setUserList(userList);
    }

    const handleUserChange = (user) => {
        setCurrentUser(user);
    }

    const location = useLocation();
    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <LogAndReg
                            handleUserChange={handleUserChange}
                            handleUserListChange={handleUserListChange}
                            socket={socket}
                        />}
                />
                <Route
                    path="/chat"
                    element={
                        <Chat
                            currentUser={currentUser}
                            userList={userList}
                            setUserList={setUserList}
                            socket={socket}
                        />
                    }
                />
            </Routes>
        </>
    );
}