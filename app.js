const express = require('express')
const app = express()
const { handlePSQLErrors, handleCustomErrors } = require('./Errors/errorhandler')

const { getTopics, getEndpoints } = require('./Controller/topics.controller')

const { getArticle } = require('./Controller/articles.controller')

//app.use(express.json()) will go here

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticle)



app.all ('/*', (req, res) => {
    res.status(404).send({msg: 'Path not found'})
    })

app.use(handlePSQLErrors)

app.use(handleCustomErrors)

    module.exports = app