
class Articles {

    static getArticleById(user, id) {
        const findArticleIndex = user.articles.findIndex(article => article._id === id);
        return findArticleIndex;
    }

    static getReadArticles(user) {
        const readArticles = user.articles.filter(article => article.isRead === true);
        return readArticles;
    }

    static getFavoriteArticles(user) {
        const favArticles = user.articles.filter(article => article.isFavorite === true);
        return favArticles;
    }

    static filterArticleBySearchKey(user, key) {
        key = key.toLowerCase();
        const filteredArticles = user.articles.filter(article => article.content.toLowerCase().includes(key));
        return filteredArticles;
    }
}

module.exports = Articles;