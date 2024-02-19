const db = require('../db/connection')
const fs = require("fs/promises");

exports.selectTopics = () => {
    let sqlQuery = `SELECT * FROM topics`

    return db.query(sqlQuery)
    .then(({rows}) => {
        return rows
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

exports.selectArticle = (articleID) => {
    return db.query(
        `SELECT * FROM articles
        WHERE article_id = $1`, [articleID]
    )
    .then(({rows, rowCount}) => {
        if(rowCount === 0){
            return Promise.reject({ status: 404, msg: 'Article not found.'})
        }
        return rows[0]
    })
}