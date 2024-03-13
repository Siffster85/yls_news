const { selectArticleComments, insertComment, removeComment, updateCommentVotes } = require('../Model/comments.model')

const { selectArticle } = require('../Model/articles.model')



exports.getArticleComments = (req, res, next) => {
    const promises = [selectArticle(req.params.article_id), selectArticleComments(req.params.article_id)]
    Promise.all(promises)
    .then((comments) => {
        if(Array.isArray(comments[1]) && !comments[1].length){
           res.status(200).send(comments[1])
        }
        res.status(200).send(comments[1])
    }).catch(next)
}


exports.addNewComment = (req, res, next) => {
    const newComment = req.body
    const articleID = req.params.article_id
    const promises = [selectArticle(req.params.article_id), insertComment(newComment, articleID)]
    Promise.all(promises)
    .then((comment) => {
        res.status(201).send(comment[1])
    }).catch(next)
    }

exports.deleteComment = (req, res, next) => {
    const commentID = req.params.comment_id
    removeComment(commentID)
    .then(() => {
        res.status(204).send()
    }).catch(next)
}

exports.patchComment = (req, res, next) => {
    const votes = req.body
    const commentID = req.params.comment_id
    updateCommentVotes(votes, commentID)
    .then((comment) => {
        res.status(200).send(comment)
    }).catch(next)
}
