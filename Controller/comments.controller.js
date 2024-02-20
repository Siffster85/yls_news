const { selectArticleComments } = require('../Model/comments.model')

const { selectArticle } = require('../Model/articles.model')


exports.getArticleComments = (req, res, next) => {
    const promises = [selectArticle(req.params.article_id), selectArticleComments(req.params.article_id)]
    Promise.all(promises)
    .then((comments) => {
        console.log(comments);
        if(comments[1].length === 0){
           res.status(200).send('No comments yet. Be the first to comment!')
        }
        res.status(200).send(comments[1])
    }).catch(next)
}

