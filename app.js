const express = require('express')
const app = express()
//Will need to pull in error handler here

const { getTopics, getEndpoints } = require('./Controller/topics.controller')

//app.use(express.json()) will go here

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)




//catch all for 404
app.all ('/*', (req, res) => {
    res.status(404).send({msg: 'Path not found'})
    })


//app.use errors will go here

    module.exports = app