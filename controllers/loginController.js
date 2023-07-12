const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');

const Files = require('../helpers/fileHelper');

const registerUser = (req, res) => {
    if(req.validated) {
        const salt = bcrypt.genSaltSync(10);
        console.log("salt...", salt)
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const user = {
                ...req.user,
                _id: uniqid(),
                password: hash,
                createdAt: new Date().getTime()
            }
            Files.writeFileSync(user);
            return res.status(200).send({succes: true, message: 'User registered successfully'})
        });
    } else {
        return res.status(401).send({succes: false, message: req.errors[0].msg})
    }
}

module.exports = { registerUser }