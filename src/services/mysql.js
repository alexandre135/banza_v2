const sequelize = require('sequelize')

    const connection = new sequelize(`mysql://root:krdt@135db@localhost:3306/banza_v2`)


module.exports = connection