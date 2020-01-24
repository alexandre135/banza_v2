const { Router } = require('express')
const login = require('./controllers/login')
const users = require('./controllers/users')

const route = Router()

route.post('/users', users.addNewUser)
route.post('/authenticate', login.signin)

module.exports = route