const { selectAllTopics, readEndpoints, selectArticle } = require('../Model/topics.model')


exports.getTopics = (req, res, next) => {
    selectAllTopics()
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

