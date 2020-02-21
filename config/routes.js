const express = require('express')

const usersControllers = require('../app/controllers/usersControllers')

const authenticateUser = require('../app/middlewares/authenticateUser')

const router = express.Router()

router.post('/users/register', usersControllers.register)
router.post('/users/login', usersControllers.login)
router.get('/users/account', authenticateUser, usersControllers.info)
router.get('/users/logout', authenticateUser, usersControllers.logout)
router.get('/admin/users', usersControllers.listUsers)



module.exports = router