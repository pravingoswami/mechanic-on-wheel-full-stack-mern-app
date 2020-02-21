const User = require ('../models/users')
const pick = require('lodash.pick')

module.exports.listUsers = (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}


module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.ips.register.push(req.ip)
    user.save()
        .then(user => res.json(pick(user, ["_id", "username", "email", "mobile"])))
        .catch(err => res.json(err))
}

module.exports.login = (req, res) => {
    const body = req.body
    let user
    console.log(body.email || body.username, body.password)
    User.findByCredentials(body.email, body.password)
        .then(userData => {
            user = pick(userData, ['_id', "username", "email"])
            return userData.generateToken(req.ip)
        })
            .then(token => res.json({user, token}))
            .catch(err => res.json(err))
}

module.exports.info = (req, res) => {
    res.json(pick(req.user, ["_id", "username", "email", "mobile"]))
}

module.exports.logout = (req, res) => {
    User.findByIdAndUpdate(req.user._id, {$pull : {tokens : { token : req.token}}})
        .then(user => user ? res.json(pick(user, ["_id", "username", "email", "mobile"])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.userInfo = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.removeUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(user => user ? res.json(user) : res.json({}))
        .catch(err => res.json(err))
}