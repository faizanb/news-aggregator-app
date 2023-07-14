const bcrypt = require('bcryptjs');
const uniqid = require('uniqid');
const jwt = require('jsonwebtoken');

const Users = require('../helpers/usersHelper');

const registerUser = (req, res) => {
    if(req.validated) {
        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const user = {
                ...req.user,
                _id: uniqid(),
                password: hash,
                createdAt: new Date().getTime()
            }
            Users.addUser(user);
            return res.status(200).send({succes: true, message: 'User registered successfully'})
        });
    } else {
        return res.status(401).send({succes: false, message: req.errors[0].msg})
    }
}

const loginUser = (req, res) => {
    if(req.validated) {
        const user = Users.getUser(req.body.email);
        delete user.password;
        delete user.articles;
        const token = jwt.sign({
            user_id: user._id
        }, 
        process.env.TOKEN_KEY,
        {
            expiresIn: "1d"
        })
        user.authtoken = token;
        res.status(200).json(user);
    } else {
        return res.status(401).send({succes: false, message: req.errors[0].msg})
    }
}

module.exports = { registerUser, loginUser }