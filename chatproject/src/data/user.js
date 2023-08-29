class User {
    constructor(UserName1, Password1, DisplayName1, Image1, ContactsList1) {
        this.UserName = UserName1
        this.Password = Password1
        this.DisplayName = DisplayName1
        this.Image = Image1
        this.ContactsList = ContactsList1
    }
    getUserName() {
        return this.UserName;
    }
    getPassword() {
        return this.Password;
    }
    getDisplayName() {
        return this.DisplayName;
    }
    getImage() {
        return this.Image;
    }
    getContactsList() {
        return this.ContactsList;
    }
    setContactsList(ContactsList) {
        this.ContactsList = ContactsList;
    }
    setPassword(Password) {
        this.Password = Password;
    }
    setDisplayName(DisplayName) {
        this.DisplayName = DisplayName;
    }
    setImage(Image) {
        this.Image = Image;
    }
    deleteContactFromContactsList(ContactUserName) {
        this.ContactsList.deleteContact(ContactUserName);
    }
}

export default User;