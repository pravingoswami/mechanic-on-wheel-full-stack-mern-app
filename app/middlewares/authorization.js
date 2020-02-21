const authorizeAdmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next()
    } else {
        res.status('403').send({notice : 'unauthorized user'})
    }
}

const authorizeCustomer = (req, res, next) => {
    if(req.user.role == 'customer'){
        next()        
    } else {
        res.status('403').send({notice : 'unauthorized customer'})
    }
}

const authorizeServiceProvider = (req, res, next) => {
    if(req.user.role == "serviceProvider"){
        next()
    } else {
        res.status('403').send({notice : 'unauthorized service provider'})
    }
}

module.exports = {authorizeAdmin, authorizeCustomer, authorizeServiceProvider}