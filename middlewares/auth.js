const jwt = require('jsonwebtoken');

const Users = require('../helpers/usersHelper');

const auth = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(403).send({error: 'A token is required for authentication'});
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = Users.getUserById(decoded.user_id);
        if(!user) {
            throw new Error('User not found');
        }
        req.user = user;
        req.token = token;
    } catch (err) {
        return res.status(401).send({error: err.message || 'Invalid Token'});
    }
    next();
}

module.exports = { auth };