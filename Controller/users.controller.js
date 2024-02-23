const { selectAllUsers, selectUser } = require('../Model/users.model')

exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
    .then((users) => {
        res.status(200).send(users)
    }).catch(next)
}

exports.getUser = (req, res, next) => {
    selectUser(req.params.username)
    .then((user) => {
        res.status(200).send(user)
    }).catch(next)
}