const sequelize = require('sequelize')
const { DataTypes } = require('sequelize')
const seq = require('../../services/mysql')

seq.sync()

const User = seq.define('user', {
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'name is required'
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:{msg: 'invalid mail format'}
        }
    },
    password:{
        type: sequelize.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'password is required'
            }
        }
    }
})


module.exports = {
    User
}
