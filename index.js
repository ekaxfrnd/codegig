// package
const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

// package devel
const logger = require('morgan')
require('dotenv').config()

// init app, host, and port
const app = express()
const {
    SERVER_HOST,
    SERVER_PORT
} = process.env

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// middleware devel
app.use(logger('dev'))

// hbs var for helpers
// let hbs = exphbs.create({})

// assets and views
app.use(express.static('public'))
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// db connection
const db = require('./config/db')
const connect = async () => {
    try {
        await db.authenticate()
        console.log('db connected successfully..')
    } catch (e) {
        console.log(e.message)
    }
}
connect()

// index route
app.get('/', (req, res) => res.render('index', { layout: 'landing'}))

// gigs route
app.use('/gigs', require('./routes/gigRoute'))

// listening app
app.listen(SERVER_PORT, () => console.log(`started on: http://${SERVER_HOST}:${SERVER_PORT}`))