const { User } = require('../models/mysql/users')
const bcrypt = require('bcrypt')
const sanitizeValidation = require('../models/mysql/utils/sanitizeValidationErros')


module.exports = {
    addNewUser: async (req, res) => {
        const { name, email, password } = req.body
        let passwordHash
        password ? passwordHash = await bcrypt.hash(password, 10) : passwordHash = null

        try { 
            const [response, created] = await User.findOrCreate({
                where: { email },
                defaults: {
                  name,
                  email,
                  password: passwordHash
                }
            })
            if(!created){
                return res.status(400).json({ error: ['this email is already in use'] })
            }
            return res.status(200).json({ id: response.id, name: response.name, email: response.email })

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
            const passHash = await User.findOne({ where: { email }})
            const passCompare = passHash ? await bcrypt.compare(password, passHash.password) : false
            
            return passCompare ? 
                res.status(200).json({msg:'logado'}) 
            : 
                res.status(400).json({ error: ['invalid email or password'] })
            
        } catch (error) {
            return res.status(500).json({ error: ['an error occurred. please try again in a few moments'] })
        }
        
        
    }
}