const express = require('express');
const routes = express.Router();

const { auth } = require('../middlewares/auth');

const { getAllNews } = require('../controllers/newsController');

routes.get('/', auth, getAllNews)

module.exports.routes = routes;
