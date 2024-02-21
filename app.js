const express = require('express')
const app = express()
const { handlePSQLErrors, handleCustomErrors } = require('./Errors/errorhandler')

const { getTopics, getEndpoints } = require('./Controller/topics.controller')

const { getArticle, getAllArticles, patchVotes } = require('./Controller/articles.controller')

const { getArticleComments, addNewComment } = require('./Controller/comments.controller')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticle)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getArticleComments)

app.post('/api/articles/:article_id/comments', addNewComment)

app.patch('/api/articles/:article_id', patchVotes)



app.all ('/*', (req, res) => {
    res.status(404).send({msg: 'Path not found'})
    })

app.use(handlePSQLErrors)

app.use(handleCustomErrors)

    module.exports = app