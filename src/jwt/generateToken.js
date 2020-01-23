const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function generateToken(id, name, email, accessLevel){
    return jwt.sign({ id, name, email, accessLevel }, process.env.TOKEN_HASH, {expiresIn: '24h'})
}

module.exports = generateToken