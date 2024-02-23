const db = require('../db/connection')

exports.selectAllUsers = () => {
    return db.query(
        `SELECT * FROM users`
    )
    .then(({rows}) => {
        return rows
    })
}

exports.selectUser = (username) => {
    return db.query(
        `SELECT * FROM users
        WHERE username = $1`, [username]
    )
    .then(({rows, rowCount}) => {
        if(rowCount === 0){
            return Promise.reject({ status: 404, msg: 'User not found.'})
        }
        return rows[0]
    })
}