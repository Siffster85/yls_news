const { selectTopics, readEndpoints, selectArticle } = require('../Model/topics.model')


exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
        res.status(200).send({topics})
    }).catch(next)
}

exports.getEndpoints = (req, res, next) => {
    readEndpoints()
    .then((endpoint) => {
        res.status(200).send(endpoint)
    }).catch(next)
}

exports.getArticle = (req, res, next) => {
    selectArticle(req.params.article_id)
    .then((article) => {
        res.status(200).send(article)
    }).catch(next)
}