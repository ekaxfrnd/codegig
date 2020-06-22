const Sequelize = require('sequelize')

const db = require('../config/db')

const Gig = db.define('gig', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    technologies: {
        type: Sequelize.STRING,
        allowNull: false
    },
    budget: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    contact_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date(),
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date(),
        allowNull: false
    }
})

module.exports = Gig