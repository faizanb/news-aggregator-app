const express = require('express');
const routes = express.Router();

const { auth } = require('../middlewares/auth');

const { getAllNews, markRead, markFavorite, getRead, getFavorites, newsSearch } = require('../controllers/newsController');

routes.get('/', auth, getAllNews);
routes.post('/:id/read', auth, markRead);
routes.post('/:id/favorite', auth, markFavorite);
routes.get('/read', auth, getRead);
routes.get('/favorites', auth, getFavorites);
routes.get('/search/:keyword', auth, newsSearch);

module.exports.routes = routes;
