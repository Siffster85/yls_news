const db = require('../db/connection')

exports.selectArticle = (articleID) => {
    return db.query(
        `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id`, [articleID]
    )
    .then(({rows, rowCount}) => {
        if(rowCount === 0){
            return Promise.reject({ status: 404, msg: 'Article not found.'})
        }
        return rows[0]
    })
}

exports.selectAllArticles = (topic, sort_by = 'created_at', order = 'desc') => {

    const acceptedQueries = ['article_id', 'title', 'topic', 'author', 'created_at', 'votes', 'comment_count']

    if(!acceptedQueries.includes(sort_by)){
        return Promise.reject({ status: 400, msg: "Bad Request!"})
    }

    if(!['asc', 'desc'].includes(order)){
        return Promise.reject({ status: 400, msg: "Bad Request!"})
    }
   
    let sqlQuery = 
    `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles
        LEFT JOIN comments
        ON comments.article_id = articles.article_id `

    if(topic){
        return db.query(
        sqlQuery +=  
        `WHERE topic = $1
        GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order}`, [topic]
        )
        .then(({rows, rowCount}) => {
            if(rowCount === 0){
                return Promise.reject({ status: 200, msg: 'No articles with this topic'})
            }
            return rows
        })
    } else {
        return db.query(
        sqlQuery += 
        `GROUP BY articles.article_id
        ORDER BY ${sort_by} ${order}`
        )
        .then(({rows}) => {
            return rows
        })
    }
}

exports.updateVotes = (votes, articleID) => {
    const voteInc = votes.inc_votes
    return db.query(
        `UPDATE articles SET votes = (votes+$1)
        WHERE article_id = $2 RETURNING *`,[voteInc, articleID]
    )
    .then(({rows}) => {
        return rows[0]
    })
}