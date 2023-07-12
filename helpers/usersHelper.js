const Files = require('./fileHelper');

class Users {

    static getAllUsers() {
        const allUsers = Files.readFileSync();
        return allUsers;
    }

    static getUser(email) {
        const allUsers = Files.readFileSync();
        const findUserIndex = allUsers.findIndex(user => user.email === email);
        return allUsers[findUserIndex];
    }

    static addUser(user) {
        const allUsers = Files.readFileSync();
        allUsers.push(user);
        Files.writeFileSync(allUsers);
    }
}

module.exports = Users;