const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const servicerProvingAsRemote = new Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    category : {
        type : mongoose.Schema.type.ObjectId,
        ref : 'ServiceProviderCategory'
    },

    shopName : {
        type : String,
        required : true
    },

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