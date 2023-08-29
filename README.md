
# Chat Project

This web chat project utilizes a powerful stack of technologies including HTML, CSS, Bootstrap, JavaScript, jQuery, React, Node.JS, Express, MongoDB, and WebSockets. With these tools, we have created an interactive and efficient chat application.

The architecture of the project consists of both server-side (backend) and client-side (frontend) components, which communicate seamlessly through web sockets. This real-time communication allows for instant messaging and updates between users.

On the server side, the backend is implemented using NodeJS and Express. These technologies enable to handle incoming requests, manage user authentication and session management, and provide a solid foundation for building APIs. The data saved in the project is securely stored and managed in MongoDB, ensuring reliable storage for user profiles, chat logs, and other essential information.

The client side is built using HTML, CSS, and Bootstrap to create an appealing and user-friendly interface. We have employed JavaScript and jQuery to enhance the interactivity and responsiveness of the chat features. Additionally, we have integrated React, a powerful JavaScript library, to build modular and reusable components for a seamless user experience.

## Technologies Used
<ul style="list-style-type: none;">
  <li>
    <div style="display: flex; align-items: center;">
      <span>React</span>
      <img src="imagesForREADME/react-icon.png" alt="React Logo" width="25" height="25">
    </div>
  </li>
  </br>
  <li>
    <div style="display: flex; align-items: center;">
      <span>JavaScript</span>
      <img src="imagesForREADME/javaScript-icon.png" alt="JavaScript Logo" width="25" height="25">
    </div>
  </li>
  </br>
  <li>
    <div style="display: flex; align-items: center;">
      <span>HTML</span>
      <img src="imagesForREADME/html-5-icon.png" alt="HTML Logo" width="25" height="25">
    </div>
  </li>
  </br>
  <li>
    <div style="display: flex; align-items: center;">
      <span>CSS</span>
      <img src="imagesForREADME/css.png" alt="CSS Logo" width="25" height="25">
    </div>
  </li>
  </br>
  <li>
    <div style="display: flex; align-items: center;">
      <span>Bootstrap</span>
      <img src="imagesForREADME/bootstrap.png" alt="Bootstrap Logo" width="25" height="25">
    </div>
  </li>
  </br>
    <li>
    <div style="display: flex; align-items: center;">
      <span>Jquary</span>
      <img src="imagesForREADME/jquary.png" alt="jquary Logo" width="25" height="25">
    </div>
  </li>
  </br>
    <li>
    <div style="display: flex; align-items: center;">
      <span>Express</span>
      <img src="imagesForREADME/express.png" alt="express Logo" width="35" height="25">
    </div>
  </li>
  </br>
      <li>
    <div style="display: flex; align-items: center;">
      <span>Node.JS</span>
      <img src="imagesForREADME/nodejs.png" alt="nodejs Logo" width="30" height="25">
    </div>
  </li>
  </br>
    <li>
    <div style="display: flex; align-items: center;">
      <span>MongoDB</span>
      <img src="imagesForREADME/mongodb.png" alt="mongodb Logo" width="60" height="25">
    </div>
  </li>
  </br>
    <li>
    <div style="display: flex; align-items: center;">
      <span>WebSockets</span>
      <img src="imagesForREADME/socketio.png" alt="socketio Logo" width="25" height="25">
    </div>
  </li>
</ul>


## Chat Functionality

### Login Page

![Screenshot of Login Page](/imagesForREADME/signIn.png) 

The login page is where users enter their username and password to access the chat system.

### Register Page

![Screenshot of Login Page](/imagesForREADME/signUp.png)

The register page is where new users can create an account to access the chat system.

### ChatBox Page
#### Welcome page of the chat
![Screenshot of Login Page](/imagesForREADME/pic1.png)
</br>
#### Chat with some contact
![Screenshot of Login Page](/imagesForREADME/pic3.png)
</br>
#### Menu for adding new chat, group chat, archived chats, settings, help center and logout button.
##### (only adding new chat and logout button are fully working at the moment)
![Screenshot of Login Page](/imagesForREADME/pic4.png)
</br>
#### Add new chat screen
![Screenshot of Login Page](/imagesForREADME/pic5.png)
</br>
#### Contact Info screen, appears when you click on the profile picture of the contact you are talking to
##### (only the delete chat option works at the moment)
![Screenshot of Login Page](/imagesForREADME/pic6.png)
</br>
The chatBox page is where users can view their contacts and start conversations.


## How to run the project
To run your chat project, follow these instructions:

1.  Open your terminal and navigate to the path of the folder **chatprojectserver** using the `cd` command.
    
2.  Once you are in the project's server path, enter the command `npm run dev` in the terminal. This command will start the server and initialize the necessary dependencies.
    
3.  Open your Chrome browser and enter the following URL in the address bar: `http://localhost:5000/`. This will take you to the chat application's homepage.
    
4.  To get started, register an account by providing the required details. Once registered, you can proceed to log in using your credentials.
    
5.  After logging in, you can start enjoying the chat functionality and engage with other users in real-time.
