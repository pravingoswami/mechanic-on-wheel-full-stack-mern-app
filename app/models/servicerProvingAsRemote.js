const mongoose = require('mongoose')
const validator = require('validator')

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

const servicerProvingAsRemote = new Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    category : {
        type : mongoose.Schema.type.ObjectId,
        ref : 'ServiceProviderCategory'
    },

    vehicalType : {
        type : String,
        enum : ['Bike', 'Tow truck'],
        required : true
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

const ServicerProvingAsRemote = mongoose.model('ServicerProvingAsRemote', servicerProvingAsRemote)

module.exports = ServicerProvingAsRemote