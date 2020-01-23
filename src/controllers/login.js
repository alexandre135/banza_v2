const { User } = require('../models/mysql/users')
const bcrypt = require('bcrypt')

const sanitizeValidation = require('../models/mysql/utils/sanitizeValidationErros')
const generateToken = require('../jwt/generateToken')


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
        
        
    },
    signin: async (req, res) =>{
        const { email, password } = req.body
        if(!password || !email){
            return res.status(400).json({ error: ['email and password are required']})
        } 

        try {
            const user = await User.findOne({ where: { email }})
            const passCompare = user ? await bcrypt.compare(password, user.password) : false
            
            return passCompare ? 
                res.status(200).json({token: generateToken(user.id, user.name, user.email)}) 
            : 
                res.status(400).json({ error: ['invalid email or password'] })
            
        } catch (error) {
            return res.status(500).json({ error: ['an error occurred. please try again in a few moments'] })
        }
        
        
    }
}