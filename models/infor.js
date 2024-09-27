const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory')

const Infor = sequelize.define({
    whatsapp: DataTypes.STRING,
    instagram: DataTypes.STRING
})

module.exports = Infor