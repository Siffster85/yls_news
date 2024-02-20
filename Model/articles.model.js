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

exports.selectAllArticles = () => {
    return db.query(
        `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        GROUP BY articles.article_id
        ORDER BY created_at DESC`
    )
    .then(({rows}) => {
        return rows
    })
}
