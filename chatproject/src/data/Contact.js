
class Contact {
    constructor(userName1, DisplayName1, profilePic1, messages1) {
        const messagesMap = messages1 instanceof Map ? new Map([...messages1]) : new Map();
        this.userName = userName1;
        this.displayName = DisplayName1;
        this.profilePic = profilePic1;
        this.messages = messagesMap;
        this.messageCounter = 0;

    }
    getUserName() {
        return this.userName;
    }
    getDisplayName() {
        return this.displayName;
    }
    getProfilePic() {
        return this.profilePic;
    }
    getMessages() {
        return this.messages;
    }
    getMessageCounter() {
        return this.messageCounter;
    }
    setMessageCounter(messageCounter) {
        this.messageCounter = messageCounter;
    }
    setMessages(messages) {
        if (messages instanceof Map) {
            this.messages = new Map([...messages]);
        } else {
            throw new Error('Invalid argument type. Expected Map.');
        }
    }

}
export default Contact;