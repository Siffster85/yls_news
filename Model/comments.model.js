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

exports.insertComment = (newComment, articleID) => {
    if(Object.keys(newComment).length !== 2) {
        return Promise.reject({ status: 400, msg: "Bad Request!"})
    }
    const { username, body } = newComment
 
    return db.query(
        `INSERT INTO comments
        (body, article_id, author)
        VALUES
        ($1, $2, $3) RETURNING *`,
        [body, articleID, username]
    )
    .then(({rows}) => {
        return rows[0]
    })
}