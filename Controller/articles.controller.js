const { selectArticle } = require('../Model/articles.model')

exports.getArticle = (req, res, next) => {
    selectArticle(req.params.article_id)
    .then((article) => {
        res.status(200).send(article)
    }).catch(next)
}