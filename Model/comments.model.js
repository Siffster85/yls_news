const db = require('../db/connection')


exports.selectArticleComments = (articleID) => {
    return db.query(
        `SELECT * FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC`, [articleID]
    )
    .then(({rows}) =>{
        return rows
    })
}