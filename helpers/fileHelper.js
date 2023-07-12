const fs = require('fs');
const path = require('path');
const FILEPATH = path.resolve(__dirname, '../dataStore/users.json');

class Files {

    //Write to File operation
    static writeFileSync(data) {
        fs.writeFileSync(FILEPATH, JSON.stringify(data, null, 4), {encoding: 'utf8', flag: 'w'});
        return;
    }

    //Read from File operation
    static readFileSync() {
        const data = fs.readFileSync(FILEPATH, {encoding: 'utf8', flag: 'r'});
        return data;
    }
}

module.exports = Files;