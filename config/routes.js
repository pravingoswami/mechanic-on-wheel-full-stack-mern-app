const express = require('express')

const usersControllers = require('../app/controllers/usersControllers')

const authenticateUser = require('../app/middlewares/authenticateUser')

const {authorizeUser} = require('../app/middlewares/authorization')

const router = express.Router()

router.post('/users/register', usersControllers.register)
router.post('/users/login', usersControllers.login)
router.get('/users/account', authenticateUser, usersControllers.info)
router.get('/users/logout', authenticateUser, usersControllers.logout)


router.get('/admin/users', authenticateUser, authorizeUser, usersControllers.listUsers)
router.get('/admin/users/:id', authenticateUser, authorizeUser, usersControllers.userInfo)
router.delete('/admin/users/:id', authenticateUser, authorizeUser, usersControllers.removeUser)



module.exports = router