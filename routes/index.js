const express = require('express');
const routes = express.Router();

const { signUpValidator, signInValidator } = require('../middlewares/validator');

const { registerUser, loginUser } = require('../controllers/loginController');

routes.get('/', (req, res, next) => {
    res.status(200).send("News aggregator app is running");
});

routes.post('/register', signUpValidator, registerUser);

routes.post('/login', signInValidator, loginUser);

module.exports.routes = routes;
