const { User } = require('../users')
const bcrypt = require('bcrypt')

async function createFirstUser(){

    try {
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        const [result, created] = await User.findOrCreate({
            where: { email: process.env.ADMIN_EMAIL },
            defaults: {
              name: process.env.ADMIN_NAME,
              email: process.env.ADMIN_EMAIL,
              password: passwordHash,
              access_level: 0
            }
        })
        if(created){
            console.log('root user has been created')
        }
    
    } catch (error) {
        return console.error(`impossible to create or find a root user \n ${error}`)
    }
}

module.exports = createFirstUser