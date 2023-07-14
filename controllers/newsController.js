const axios = require('axios');
const uniqid = require('uniqid');

const Users = require('../helpers/usersHelper');
const Articles = require('../helpers/articleHelper');

const getAllNews = (req, res) => {
    const baseURL = process.env.NEWS_API_BASEURL;
    const categories = req.user.categories.join(',');
    const url = `${baseURL}/top-headlines?country=us&categories=${categories}`;
    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${process.env.NEWS_API_KEY}`
        }
    }).then(resp => {
        const processedData = resp.data.articles.map(article => {
            if(req.user.sources.includes(article.source.id)) {
                article._id = uniqid();
                article.isRead = false;
                article.isFavorite = false;
                return article;
            } 
        }).filter(item => item !== undefined);
        const { allUsers, authUserIndex } = Users.getAuthUserIndex(req.user._id);
        allUsers[authUserIndex].articles = processedData;
        Users.setAllUsers(allUsers);
        return res.status(200).send({success: true, articles: processedData});
    }).catch(err => {
        return res.status(500).send({success: false, message: 'Failed to fetch data'})
    })
}

const markRead = (req, res) => {
    const articleIndex = Articles.getArticleById(req.user, req.params.id);
    if(articleIndex === -1) {
        return res.status(404).send({success: false, message: 'Article with given Id not found'});
    } else {
        const { allUsers, authUserIndex } = Users.getAuthUserIndex(req.user._id);
        const article = allUsers[authUserIndex].articles[articleIndex];
        if(article.isRead) {
            return res.status(200).send({success: true, message: 'The article is already marked read', article: article});
        } else {
            article.isRead = true;
            allUsers[authUserIndex].articles[articleIndex].isRead = true;
            Users.setAllUsers(allUsers);
            return res.status(200).send({success: true, message: 'Updated read status on the article',  article: article});
        }
    }
}

const markFavorite = (req, res) => {
    const articleIndex = Articles.getArticleById(req.user, req.params.id);
    if(articleIndex === -1) {
        return res.status(404).send({success: false, message: 'Article with given Id not found'});
    } else {
        const { allUsers, authUserIndex } = Users.getAuthUserIndex(req.user._id);
        const article = allUsers[authUserIndex].articles[articleIndex];
        if(article.isFavorite) {
            return res.status(200).send({success: true, message: 'The article is already marked as favorite', article: article});
        } else {
            article.isFavorite = true;
            allUsers[authUserIndex].articles[articleIndex].isFavorite = true;
            Users.setAllUsers(allUsers);
            return res.status(200).send({success: true, message: 'Article added to favorites',  article: article});
        }
    }
}

const getRead = (req, res) => {
    const readArticles = Articles.getReadArticles(req.user);
    res.status(200).send({success: true, articles: readArticles});
}

const getFavorites = (req, res) => {
    const favArticles = Articles.getFavoriteArticles(req.user);
    res.status(200).send({success: true, articles: favArticles});
}

const newsSearch = (req, res) => {
    let searchKey = req.params.keyword;
    let filteredArticles = Articles.filterArticleBySearchKey(req.user, searchKey);
    filteredArticles = filteredArticles || [];
    res.status(200).send({success: true, articles: filteredArticles});
}

module.exports = { getAllNews, markRead, markFavorite, getRead, getFavorites, newsSearch }