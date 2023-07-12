const axios = require('axios');

const Users = require('../helpers/usersHelper');

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

module.exports = { getAllNews }