const db = require('../db/connection')

exports.selectTopics = () => {
    let sqlQuery = `SELECT * FROM topics`

    return db.query(sqlQuery)
    .then(({rows}) => {
        console.log(rows);
        return rows
    })
}