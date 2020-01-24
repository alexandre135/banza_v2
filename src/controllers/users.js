const { User } = require('../models/mysql/users')
const bcrypt = require('bcrypt')
const sanitizeValidation = require('../models/mysql/utils/sanitizeValidationErros')


module.exports = {
    addNewUser: async (req, res) => {
        const { name, email, password, accessLevel } = req.body
        let passwordHash
        password ? passwordHash = await bcrypt.hash(password, 10) : passwordHash = null

        try { 
            const [result, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                  name,
                  email,
                  password: passwordHash,
                  access_level: accessLevel
                }
            })
            if(!created){
                return res.status(400).json({ error: ['this email is already in use'] })
            }
            return res.status(200).json({ created: true })

        } catch (error) {
            
            const msg = sanitizeValidation(error)                   
            
            return res.status(400).json({ error: msg })
        }
        
        
    }
}