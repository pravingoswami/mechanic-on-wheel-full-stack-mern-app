const User = require('../models/users')
const pick = require('lodash.pick')
const ServiceProvider = require('../models/serviceProvider')


module.exports.register = (req, res) => {
    console.log(req.files.avatar[0].path)
    const user = new User(pick(req.body, ['name', 'username', 'email', 'mobile', 'password', 'role', 'gender', 'avatar', 'lisenceNumber', 'lisenceImage']))
    req.files && (user.avatar = req.files.avatar[0].path,
        user.lisenceImage = req.files.lisenceImage[0].path
        )
        console.log('this is user',user)
    if(req.body.role == 'customer'){
        user.save()
            .then(user => res.json(pick(user, ['_id','name', 'user', 'email', 'mobile', 'gender', 'avatar', 'lisenceNumber', 'lisenceImage'])))
            .catch(err => res.json(err))
    } else if(req.body.role == 'serviceProvider'){
        user.save()
        .then(user => {
            if(req.body.serviceType == 'Service Provider as Remotely'){
                const serviceProvider = new ServiceProvider(pick(req.body, ['serviceType']))
                serviceProvider.user = user._id
                serviceProvider.save()
                    .then(serviceProvider => res.json( {'user' : pick(user, ['_id','name', 'user', 'email', 'mobile', 'gender', 'avatar', 'lisenceNumber', 'lisenceImage']), 'serviceProvider' : pick(serviceProvider, ['_id', 'serviceType'])}))
                    .catch(err => res.json(err))
            } else if(req.body.serviceType == 'Service Provider as Shop Owner'){
                const serviceProvider = new ServiceProvider(pick(req.body, ['serviceType', 'shopName']))
                serviceProvider.user = user
                serviceProvider.save()
                    .then(serviceProvider => res.json( {'user' : pick(user, ['_id','name', 'user', 'email', 'mobile', 'gender', 'avatar', 'lisenceNumber', 'lisenceImage']), 'serviceProvider' : pick(serviceProvider, ['_id', 'serviceType', 'shopName'])}))
                    .catch(err => res.json(err))
            }
            
        })
        .catch(err => res.json(err))
    }
}


module.exports.login = (req, res) => {
    const body = req.body
    let user
    User.findByCredentials(body.email || body.username, body.password)
        .then(userData => {
            user = pick(userData, ['_id','name', "username", "email", 'role', 'mobile', 'gender', 'avatar', 'lisenceNumber', 'lisenceImage'])
            return userData.generateToken(req.ip)
        })
            .then(token => {
                if(user.role == 'customer'){
                    console.log('customer')
                    res.json({user, token})
                } else if(user.role == 'serviceProvider') {
                    ServiceProvider.findOne({'user' : user._id})
                        .then(serviceProvider => {
                    console.log('serviceProvider')

                            if(serviceProvider){
                                user['serviceType'] = serviceProvider.serviceType
                                serviceProvider.shopName && (user['shopName'] = serviceProvider.shopName)
                                res.json({user, token})
                            } else {
                                res.json({})
                            }
                        })
                        .catch(err => res.json(err))
                }
            })
            .catch(err => res.json(err))
}

module.exports.info = (req, res) => {
    console.log(req.user._id)
    if(req.user.role == "customer" || req.user.role == "admin"){
        res.json(pick(req.user, ['_id','name', "username", "email", 'role', 'mobile', 'gender', 'avatar', 'lisenceNumber', 'lisenceImage']))
    } else {
        ServiceProvider.findOne({'user' : req.user._id})
        .then(serviceProvider => {
            if(serviceProvider){
                req.user.serviceType = serviceProvider.serviceType
                serviceProvider.shopName && (req.user['shopName'] = serviceProvider.shopName)
                res.json(pick(req.user, ['_id','name', "username", "email", 'role', 'mobile', 'gender', 'avatar', 'serviceType', 'lisenceNumber', 'lisenceImage', 'shopName']))
            } else {
                res.json({})
            }
        })

        .catch(err => res.json(err))
    }
}

module.exports.edit = (req, res) => {
    const body = pick(req.body,  ['name', 'username', 'mobile', 'gender', 'avatar'])
    console.log(req.file)
    req.file && (body['avatar'] = req.file.path )
    console.log(body)

    User.findByIdAndUpdate(req.user._id, body, {new : true, runValidators : true})
        .then(user => user ? res.json(pick(user, ['_id','name', 'user', 'email', 'mobile', 'gender', 'avatar', 'lisenceNumber', 'lisenceImage'])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.logout = (req, res) => {
    User.findByIdAndUpdate(req.user._id, {$pull : {tokens : { token : req.token}}})
        .then(user => user ? res.json(pick(user, ["_id", "username", "email", "mobile", 'avatar', 'lisenceNumber'])) : res.json({}))
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

module.exports.listUsers = (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}