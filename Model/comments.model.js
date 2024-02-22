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

exports.removeComment = (commentID) => {
    return db.query(
        `SELECT * FROM comments
        WHERE comment_id = $1`, [commentID]
    )
    .then(({rows}) => {
        if(rows.length === 0){
            return Promise.reject({ status: 404, msg: 'Comment not found'})
        } else {
            return db.query(
                `DELETE FROM comments
                WHERE comment_id = $1 RETURNING *`,
                [commentID]
            )
            .then(({rows}) => {
                if(rows[0].comment_id === commentID){
                return rows}
            })
        }
    })
}