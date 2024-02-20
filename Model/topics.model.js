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