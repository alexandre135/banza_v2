const sequelize = require('sequelize')
    const connection = new sequelize(process.env.DBMYSQL_STRING_CONNECTION)

module.exports = connection