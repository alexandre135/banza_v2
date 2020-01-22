const { Router } = require('express')
const login = require('./controllers/login')

const route = Router()

route.post('/signup', login.addNewUser)
route.post('/signin', login.signin)

module.exports = route