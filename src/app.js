const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() //express app doesn't take in args, it uses methods.

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')  //set a value for a given express setting
app.set('views', viewsPath)
hbs.registerPartials(partialsPath) //takes a path to register your partials

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //configures our express application

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ivan Leong'
    }) //render allows us to render one of our views
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ivan Leong'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'For more assistance, please visit the following sources.',
        title: 'Help',
        name: 'Ivan Leong'
    })
})

// app.get('', (req, res) => {  // configure what the we send back to the user when they make a request (JSON / HTML)
//     res.send('<h1>Weather<h1>')   // we can use various methods on response to configure our response.
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27
//         }, {
//         name: 'Sarah'
//     }])
// })

// app.get('/about', (req,res) => {
//     res.send('<h1>About Page<h1>')
// })

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address in the query string'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({Error: error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
    })
})


app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    } 
    console.log(req.query.search)
        res.send({
        products: []
    })
})


// matches any page that hasn't been matched that starts with /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        title: '404',
        name: 'Ivan Leong'
    })
})

// Sets up a 404 page (This HAS TO come LAST!)
app.get('*', (req, res) => {   //* --> match anything that hasn't been matched before
    res.render('404', {
        errorMessage: 'Page not found.',
        title: '404',
        name: 'Ivan Leong'
    })
})

app.listen(3000, () => {  // starts up a server and has it listen on a specific port.
    console.log('Server is up on port 3000.')
})


// CLI for nodemon to watch hbs files as well.
// nodemon src/app.js -e js,hbs css

// video 56: integrating JSON into HTML