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
        enum : ['Bike', 'Car', 'Toe Truck', 'Auto']
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