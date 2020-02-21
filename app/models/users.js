const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs  = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({

    name : {
        type : String
    },

    username : {
        type : String,
        unique : true,
        required : true
    },

    email : {
        type : String,
        unique : true,
        required : true,
        validate : {
            validator : function(value) {
                return validator.isEmail(value)
            },
            message : function(){
                return 'Invalid Email Type'
            }
        }
    },

    password : {
        type : String,
        required : true
    },

    ips : {
        register : [String],
        login : [String],
        logout : [String]
    },

    tokens : [
        {
            token : {
                type : String
            },
            createdAt : {
                type : Date,
                default : Date.now()
            }
        }
    ],

    role : {
        type : String,
        enum : ['admin', 'customer', 'serviceProvider'],
        default : 'customer'
    },

    loginCount : {
        type : Number,
        default : 0
    },

    gender : {
        type : String,
        enum : ['male', 'female']
    },

    avatar : {
        type : String
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }

})

userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(salt => {
            bcryptjs.hash(user.password, salt)
                .then(encryptedPassword => {
                    user.password = encryptedPassword
                    next()
                })
        })
    } else {
        next()
    }
})

userSchema.statics.findByCredentials = function(email, password){
    const User = this
    return User.findOne({email})
                .then(User => {
                    if(!User){
                        return Promise.reject({errors : 'Invalid email or password'})
                    }
                    return bcryptjs.compare(password, User.password)
                                .then(result => result ? Promise.resolve(User) : Promise.reject({errors : 'Invalid email or password'}))
                                .catch(err => Promise.reject(err))
                })

                .catch(err => Promise.reject(err))
}

userSchema.methods.generateToken = function(ip){
    const user = this
    const tokenData = {
        id : user._id,
        username : user.username,
        createdAt : Date.now()
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({token})
    user.ips.login.push(ip)
    user.loginCount += 1
    return user.save()
        .then(user => Promise.resolve(token))
        .catch(err => Promise.reject(err))
}

userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData 
    try{
        tokenData = jwt.verify(token, 'jwt@123')
    }catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        '_id' : tokenData.id,
        'tokens.token' : token
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User