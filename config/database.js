const mongoose = require('mongoose')

const setupDB = () => {
    mongoose.connect('mongodb://localhost:27017/mechanic-on-wheel', { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true})
        .then(() => {
            console.log('connected with the db')
        }) 

        .catch(err => console.log(err))
}

module.exports = setupDB