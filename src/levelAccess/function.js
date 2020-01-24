const jwt = require('jsonwebtoken')
const { accessLevel } = require('./config')

function verifyAccess(url, method, token){
    const splitedToken = token.split(' ')
    const jwtInfo =jwt.decode(splitedToken[1])

    
    if(jwtInfo.accessLevel === 0) return true

    const check = accessLevel.some((item) => {
        return item[0] === url && item[1] === method && jwtInfo.accessLevel <= item[2]
    })

    return check
}

module.exports = verifyAccess