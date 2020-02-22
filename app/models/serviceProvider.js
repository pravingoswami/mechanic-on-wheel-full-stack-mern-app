const mongoose = require('mongoose')

const Schema = mongoose.Schema

const suppoerterSchema = new Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        validate : {
            validator : function(value){
                return validator.isEmail(value)
            },
            message : function(){
                return 'Invalid Email'
            }
        }
    },

    mobile : {
        type : String,
        minlength : 10,
        maxlength : 10,
        validate : {
            validator : function(value){
                return validator.isNumeric(value)
            },
            message : function(){
                return  'Invalid Mobile Number'
            }
        }
    },

    avatar : {
        type : String
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const serviceProvider = new Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    role : {
        type : String,
        enum : ['Service Provider as Remotely', 'Service Provider as Shop Owner']
    },

    vehicalType : {
        type : String,
        enum : ['Bike', 'Tow truck'],
        required : true
    },

    shopName : {
        type : String
    },

    suppoerter : [suppoerterSchema],

    location : {
        type: { type: String },
        coordinates: []
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const ServiceProvider = mongoose.model('Service Provider', serviceProvider)

module.exports = ServiceProvider