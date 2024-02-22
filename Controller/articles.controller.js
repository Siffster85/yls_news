const { selectArticle, selectAllArticles, updateVotes } = require('../Model/articles.model')

const { selectTopic } = require('../Model/topics.model')

exports.getArticle = (req, res, next) => {
    selectArticle(req.params.article_id)
    .then((article) => {
        res.status(200).send(article)
    }).catch(next)
}

exports.getAllArticles = (req, res, next) => {
    const { topic } = req.query
    const promises = [selectTopic(topic), selectAllArticles(topic)]
    Promise.all(promises)
    .then((articles) => {
        res.status(200).send(articles[1])
    }).catch(next)
}

exports.patchVotes = (req, res, next) => {
    const votes = req.body
    const articleID = req.params.article_id

    const promises = [selectArticle(req.params.article_id), updateVotes(votes, articleID)]
    
    Promise.all(promises)
    .then((article) => {
        res.status(200).send(article)
    }).catch(next)
}