const authorizeAdmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next()
    } else {
        res.status('403').send({notice : 'unauthorized user'})
    }
}

module.exports = {authorizeAdmin}