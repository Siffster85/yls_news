const db = require('../db/connection')

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