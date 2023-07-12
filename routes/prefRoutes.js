const express = require('express');
const routes = express.Router();

const { auth } = require('../middlewares/auth');

module.exports.routes = routes;