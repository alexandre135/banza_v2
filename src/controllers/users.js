const { User } = require('../models/mysql/users')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const sanitizeValidation = require('../models/mysql/utils/sanitizeValidationErros')
const jwt = require('jsonwebtoken')
const decodeToken = require('../jwt/decodeToken')


module.exports = {
    addNewUser: async (req, res) => {
        const { name, email, password, confirmPassword, accessLevel } = req.body
        if(password !== confirmPassword){ 
            return res.status(400).json({ error:['password and confirmation must be equal']})
        }
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
    getUsers: async (req, res) =>{
        const token = decodeToken(req.headers.authorization)

        try {
            const result = await User.findAll({ 
                where:{
                    access_level:{
                        [Op.gte]: token.accessLevel
                    }
                },
                attributes: { exclude: ['password', 'access_level'] } 
            })

            return res.status(200).json({ result })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: ['an error occurred. please try again in a few moments'] })
        }
    },
    getUserById: async (req, res) =>{
        const userId = req.params
        try {
            const result = await User.findOne({
                where:{ id: parseInt(userId.id) },
                attributes: { exclude: ['password', 'access_level'] }
            })

            return res.status(200).json({ result })

        } catch (error) {
            console.error(error)
            return res.status(400).json({ error: ['an error occurred. check if you passed "id" parameter in request'] })
        }
    },
    modifyUser: async (req, res) =>{
        const {id, name, email, accessLevel} = req.body
        
        if(!id) return res.status(400).json({ error: ['"id" is required'] })
       
        try {
            const result = await User.update({ name, email, access_level: accessLevel }, {
                where:{ id }
            })
            return res.status(200).json({
                msg: 'User updated', 
                updated: result 
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: ['an error occurred. please try again in a few moments'] })
        }
    }
}