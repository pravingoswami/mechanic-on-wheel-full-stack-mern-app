const express = require('express')

const usersControllers = require('../app/controllers/usersControllers')

const authenticateUser = require('../app/middlewares/authenticateUser')

const {authorizeAdmin, authorizeCustomer, authorizeServiceProvider} = require('../app/middlewares/authorization')

const router = express.Router()

router.post('/customers/register', usersControllers.register)
router.post('/customers/login', usersControllers.login)
router.get('/customers/account', authenticateUser, authorizeCustomer, usersControllers.info)
router.put('/customers/edit', authenticateUser, authorizeCustomer, usersControllers.edit)
router.delete('/customers/logout', authenticateUser, authorizeCustomer, usersControllers.logout)

router.post('/service-providers/register', usersControllers.register)
router.post('/service-providers/login', usersControllers.login)
router.put('/service-providers/edit', authenticateUser, authorizeServiceProvider, usersControllers.edit)
router.get('/service-providers/account', authenticateUser, authorizeServiceProvider, usersControllers.info)
router.delete('/service-providers/logout', authenticateUser, authorizeServiceProvider, usersControllers.logout)

router.get('/admin/users', authenticateUser, authorizeAdmin, usersControllers.listUsers)
router.get('/admin/users/:id', authenticateUser, authorizeAdmin, usersControllers.userInfo)
router.delete('/admin/users/:id', authenticateUser, authorizeAdmin, usersControllers.removeUser)


module.exports = router