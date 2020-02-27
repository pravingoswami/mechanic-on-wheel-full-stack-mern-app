const express = require('express')

const multer = require("multer")

const usersControllers = require('../app/controllers/usersControllers')
const vehicalControllers = require('../app/controllers/vehicalControllers')

const authenticateUser = require('../app/middlewares/authenticateUser')

const {authorizeAdmin, authorizeCustomer, authorizeServiceProvider} = require('../app/middlewares/authorization')

const router = express.Router()

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        console.log(req.params.type)
        cb(null, './upload/profiles/')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage : storage, fileFilter : fileFilter})


router.post('/users/register',upload.fields([{name : 'avatar'}, {name : 'lisenceImage'}]), usersControllers.register)
router.post('/users/login', usersControllers.login)
router.get('/users/account',authenticateUser ,usersControllers.info)
router.post('/users/edit',authenticateUser , upload.fields([{name : 'avatar'}, {name : 'lisenceImage'}]) , usersControllers.edit)
router.delete('/users/logout',authenticateUser ,usersControllers.logout)

const vehicalStorage = multer.diskStorage({
    destination : function(req, file, cb){
        console.log(req.params.type)
        cb(null, './upload/vehicals/')
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
})

const vehicalUpload = multer({storage : vehicalStorage, fileFilter : fileFilter})

router.get('/users/vehicals', authenticateUser, authorizeCustomer, vehicalControllers.list)
router.post('/users/vehicals', authenticateUser, authorizeCustomer, vehicalUpload.single('vehicalImage'), vehicalControllers.create)
router.get('/users/vehicals/:id', authenticateUser, authorizeCustomer, vehicalControllers.show)
router.put('/users/vehicals/:id', authenticateUser, authorizeCustomer, vehicalUpload.single('vehicalImage'), vehicalControllers.update)
router.delete('/users/vehicals/:id', authenticateUser, authorizeCustomer, vehicalControllers.destroy)

router.get('/admin/users', authenticateUser, authorizeAdmin, usersControllers.listUsers)
router.get('/admin/users/:id', authenticateUser, authorizeAdmin, usersControllers.userInfo)
router.delete('/admin/users/:id', authenticateUser, authorizeAdmin, usersControllers.removeUser)


module.exports = router