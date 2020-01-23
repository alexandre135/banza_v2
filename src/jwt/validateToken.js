const jwt = require('jsonwebtoken')

function validateToken(token){
    const splitedToken = token.split(' ')

    if(splitedToken[0] !== 'Bearer') return false

    try {

       jwt.verify(splitedToken[1], process.env.TOKEN_HASH)

    } catch (error) {

       console.error(error)
       return false 

    }

    return true
}

module.exports = validateToken