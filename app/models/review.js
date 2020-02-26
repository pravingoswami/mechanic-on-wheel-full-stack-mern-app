const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    reviewBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    reviewTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    review : {
        type : Number,
        required : true
    },

    title : {
        type : String
    },

    body : {
        type : String
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const ReviewSchema = mongoose.model('ReviewSchema', reviewSchema)

module.exports = ReviewSchema
