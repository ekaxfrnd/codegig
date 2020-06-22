const Gig = require('../models/Gig')

const Op = require('sequelize').Op

module.exports = {
    gigs: async (req, res) => {
        try {
            const gigs = await Gig.findAll()
            res.render('gigs', { gigs: gigs.map(gig => gig.toJSON()) })
        } catch (err) {
            console.log(err.message);
        }
    },
    getAdd: (req, res) => res.render('add'),
    postAdd: async (req, res) => {
        let {
            title,
            technologies,
            budget,
            description,
            contact_email
        } = req.body
        let errors = []

        try {
            if(!title) {
                errors.push({ text: 'Please add a text' })
            }
            if(!technologies) {
                errors.push({ text: 'Please add some technologies' })
            }
            if(!description) {
                errors.push({ text: 'Please add a description' })
            }
            if(!contact_email) {
                errors.push({ text: 'Please add a contact email' })
            }
    
            if(errors.length > 0) {
                res.render('add', {
                    errors,
                    title,
                    technologies,
                    budget,
                    description,
                    contact_email
                })
            } else {
                if(!budget) {
                    budget = 'Unknown'
                } else {
                    budget = `$${budget}`
                }
                technologies = technologies.toLowerCase().replace(/, /g, ',')
                await Gig.create({
                    title,
                    technologies,
                    budget,
                    description,
                    contact_email
                })
                return res.redirect('/gigs')
            }
        } catch(err) {
            console.log(err.message)
        }
    },
    search: async (req, res) => {
        let { term } = req.query
        term = term.toLowerCase()
        try {
            const gigs = await Gig.findAll({ where: {
                technologies: {
                    [Op.like]: `%${term}%`
                }
            }})
            return res.render('gigs', { gigs: gigs.map(gig => gig.toJSON())})
        } catch(err) {
            console.log(err.message)
        }
    }
}