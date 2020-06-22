const router = require('express').Router()

const { gigs, getAdd, postAdd, search } = require('../controllers/gigController')

router.get('/', gigs)
router.get('/add', getAdd)
router.post('/add', postAdd)
router.get('/search', search)

module.exports = router