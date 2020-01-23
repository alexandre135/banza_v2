const express = require('express')
const routes = require('./src/routes')
const firstUser = require('./src/models/mysql/utils/firstUser')
const validateToken = require('./src/jwt/validateToken')
const noJwtRequired = require('./src/jwt/routeExclusions')

require('dotenv').config()

firstUser()

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    const exclusionRoutes = req.originalUrl.includes(noJwtRequired)
    if(!exclusionRoutes){
        const token = req.headers.authorization
        
        if(!token) return res.status(403).json({error:['token should be passed']})

        const validate = validateToken(token)

        if(!validate) return res.status(403).json({ error:['invalid token']})
    }
    next()
})
app.use(routes)



app.use((req, res)=>{
    res.status(404).json({msg:'this route is not available'})
})

app.listen(3333, ()=>{
    console.log('escutando na porta 3333')
})