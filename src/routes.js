const { Router } = require('express')
const login = require('./controllers/login')
const users = require('./controllers/users')

const route = Router()

route.get('/users', users.getUsers)
route.get('/users/:id', users.getUserById)
route.post('/users', users.addNewUser)
route.put('/users', users.modifyUser)
// route.delete('/users', users.deleteUser)


route.post('/authenticate', login.signin)
route.get('/nolvlreq', (req, res) => {
    res.json({teste: "chegou"})
})

module.exports = route