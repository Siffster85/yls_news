const { log } = require('console');
const db = require('../db/connection')
const fs = require("fs/promises");

exports.selectAllTopics = () => {
    let sqlQuery = `SELECT * FROM topics`

    return db.query(sqlQuery)
    .then(({rows}) => {
        return rows
    })
}

exports.selectTopic = (topic) => {
    return db.query(
        `SELECT * FROM topics
        WHERE slug = $1`, [topic]
    )
    .then(({rows, rowCount}) => {
        if(topic){
            
        if(rowCount === 0){

            return Promise.reject({ status: 404, msg: 'Topic not found'})
        }}
        return rows[0]
    })
}

exports.readEndpoints = () => {
    const endpointPath = `./endpoints.json`
    return fs.readFile(endpointPath, 'utf-8')
    .then((endpoint) => {
        const parsedEndpoint = JSON.parse(endpoint)
        return parsedEndpoint
    })

}