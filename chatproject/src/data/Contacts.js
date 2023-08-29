// import Contact from "./Contact.js";
// import omer from "../images/omer.jpg"
// import ronen from "../images/ronen.jpeg"
// import noa from "../images/noa.jpeg"
class Contacts {
    // constructor() {
    //     this.contacts = [
    //         new Contact(0, "zildoga", "Omer Groman", omer, new Map([
    //             [1, {
    //                 messageContent: "מה קורה?",
    //                 time: "23:10 PM",
    //                 date: "23/4/2023",
    //                 sender: "me"
    //             }],
    //             [2, {
    //                 messageContent: "סבבה, ביי",
    //                 time: "23:15 PM",
    //                 date: "23/4/2023",
    //                 sender: "Omer Groman"
    //             }]
    //         ])),
    //         new Contact(1, "Ronen", "Ronen Sivak", ronen, new Map([
    //             [1, {
    //                 messageContent: "אתה בא לעל האש?",
    //                 time: "23:10 PM",
    //                 date: "25/4/2023",
    //                 sender: "me"
    //             }],
    //             [2, {
    //                 messageContent: "לא יכול",
    //                 time: "23:15 PM",
    //                 date: "25/4/2023",
    //                 sender: "Ronen Sivak"
    //             }]
    //         ])),
    //         new Contact(2, "noa", "נועה ראובן", noa, new Map([]))
    //     ];
    //     this.serialNumberCounter = 3;
    // }


    constructor() {
        this.contacts = [];
    }

    addNewContact(contact) {
        this.contacts.push(contact);
    }

    getContacts() {
        return this.contacts;
    }

    setContacts(contacts) {
        this.contacts = contacts;
    }

    addMessageToContact(userName, message) {
        if (userName !== -1) {
            const contact = this.contacts.find(c => c.userName === userName);
            const messageNumber = contact.getMessageCounter();
            contact.setMessageCounter(contact.getMessageCounter() + 1);
            if (contact) {
                if (!contact.getMessages()[messageNumber]) {
                    contact.getMessages()[messageNumber] = [];
                }
                contact.getMessages().set(messageNumber, {
                    messageContent: message.message,
                    time: message.messageTime,
                    date: message.messageDate,
                    sender: message.sender
                })
            }
        }
    }

    deleteContact(usernameToRemove) {
        this.contacts = this.contacts.filter(contact => contact.getUserName() !== usernameToRemove);
        return this.contacts;
    }
}
export default Contacts;

