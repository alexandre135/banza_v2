const { User } = require('../models/mysql/users')
const bcrypt = require('bcrypt')
const generateToken = require('../jwt/generateToken')


module.exports = {
    signin: async (req, res) =>{
        const { email, password } = req.body
        if(!password || !email){
            return res.status(400).json({ error: ['email and password are required']})
        } 

        try {
            const user = await User.findOne({ where: { email }})
            const passCompare = user ? await bcrypt.compare(password, user.password) : false
            
            return passCompare ? 
                res.status(200).json({token: generateToken(user.id, user.name, user.email, user.access_level)}) 
            : 
                res.status(400).json({ error: ['invalid email or password'] })
            
        } catch (error) {
            return res.status(500).json({ error: ['an error occurred. please try again in a few moments'] })
        }
        
        
    }
}