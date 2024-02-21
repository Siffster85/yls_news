const { selectArticleComments, insertComment } = require('../Model/comments.model')

const { selectArticle } = require('../Model/articles.model')



exports.getArticleComments = (req, res, next) => {
    const promises = [selectArticle(req.params.article_id), selectArticleComments(req.params.article_id)]
    Promise.all(promises)
    .then((comments) => {
        if(Array.isArray(comments[1]) && !comments[1].length){
           res.status(200).send(comments)
        }
        res.status(200).send(comments)
    }).catch(next)
}


exports.addNewComment = (req, res, next) => {
    const newComment = req.body
    const articleID = req.params.article_id
    const promises = [selectArticle(req.params.article_id), insertComment(newComment, articleID)]
    Promise.all(promises)
    .then((comment) => {
        res.status(201).send(comment)
    }).catch(next)
    }


