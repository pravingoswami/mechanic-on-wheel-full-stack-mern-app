const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vehicalSchema = new Schema({

    vehicalNumber : {
        type : String,
        required : true
    },

    vehicalImage : {
        type : String
    },

    vehicalType : {
        type : String,
        enum : ['2 Wheeler', '4 Wheeler', '3 Wheeler']
    },

    user : {
        type : mongoose.Schema.Types.ObjectId
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const Vehical = mongoose.model('Vehical', vehicalSchema)

module.exports = Vehical