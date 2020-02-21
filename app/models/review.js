const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    reviewText : {
        type : String
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})
