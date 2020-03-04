const jwt = require('jsonwebtoken')

function decodeToken(token){
    const splitedToken = token.split(' ')
    const jwtInfo =jwt.decode(splitedToken[1])

    return jwtInfo
}

module.exports = decodeToken