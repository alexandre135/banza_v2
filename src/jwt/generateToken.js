const jwt = require('jsonwebtoken')

function generateToken(id, name, email){
    return jwt.sign({ id, name, email }, process.env.TOKEN_HASH, {expiresIn: '24h'})
}

module.exports = generateToken