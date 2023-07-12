const Files = require('./fileHelper');

class Users {

    static getAllUsers() {
        const allUsers = Files.readFileSync();
        return allUsers;
    }

    static setAllUsers(users) {
        return Files.writeFileSync(users);
    }

    static getUser(email) {
        const allUsers = this.getAllUsers();
        const findUserIndex = allUsers.findIndex(user => user.email === email);
        return allUsers[findUserIndex];
    }

    static addUser(user) {
        const allUsers = this.getAllUsers();
        allUsers.push(user);
        return Files.writeFileSync(allUsers);
    }

    static getUserById(id) {
        const allUsers = this.getAllUsers();
        const findUserIndex = allUsers.findIndex(user => user._id === id);
        return findUserIndex !== -1 ? allUsers[findUserIndex] : null;
    }

    static getAuthUserIndex(id) {
        const allUsers = this.getAllUsers();
        const findUserIndex = allUsers.findIndex(user => user._id === id);
        return {allUsers, authUserIndex: findUserIndex}
    }
}

module.exports = Users;