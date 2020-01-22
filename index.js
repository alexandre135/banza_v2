const express = require('express')
const routes = require('./src/routes')

const connect = require('./src/services/mongodb')

require('dotenv').config()


const app = express()

app.use(express.json())
app.use(routes)
app.use((req, res)=>{
    res.status(404).json({msg:'this route is not available'})
})

app.listen(3333, ()=>{
    console.log('escutando na porta 3333')
})