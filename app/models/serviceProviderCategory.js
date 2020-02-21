const mongoose = require('mongoose')

const Schema = mongoose.Schema

const serviceProviderCategorySchema = new Schema({

    serviceType : {
        type : String
    },

    createdAt : {
        type : Date,
        default : true
    }

})

const ServiceProviderCategory = mongoose.model('ServiceProviderCategory', serviceProviderCategorySchema)

module.exports = ServiceProviderCategory