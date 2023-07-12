const express = require('express');
const routes = express.Router();

const { signUpValidator } = require('../middlewares/validator');

const { registerUser } = require('../controllers/loginController');

routes.get('/', (req, res, next) => {
    res.status(200).send("News aggregator app is running");
});

routes.post('/register', signUpValidator, registerUser)

module.exports.routes = routes;
