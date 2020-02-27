const Vehical = require('../models/vehical')

module.exports.list = (req, res) => {
    Vehical.find({user : req.user._id})
        .then(vehical => res.json(vehical))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const vehical = new Vehical(req.body)
    req.file && (vehical.vehicalImage = req.file.path)
    console.log(vehical)
    vehical.user = req.user._id
    vehical.save()
        .then(vehical => res.json(vehical))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    Vehical.findOne({_id : req.params.id, user : req.user._id})
        .then(vehical => vehical ? res.json(vehical) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    const body = req.body
    req.file && (body.vehicalImage = req.file.path)
    Vehical.findOneAndUpdate({_id : req.params.id, user : req.user._id}, body, {runValidators : true, new : true})
    .then(vehical => vehical ? res.json(vehical) : res.json({}))
    .catch(err => res.json(err))
}

module.exports.destroy = (req, res) => {
    Vehical.findOneAndDelete({_id : req.params.id, user : req.user._id})
        .then(vehical => vehical ? res.json(vehical) : res.json({}))
        .catch(err => res.json(err))
}