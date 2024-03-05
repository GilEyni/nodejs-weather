import { fileURLToPath } from 'url'
import path from 'path'
import express from 'express'
import hbs from 'hbs'
import forecast from './utils/forecast.js'
import geoCode  from './utils/geocode.js'

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    const address  = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(address, (error, {lat, lon, location} = {}) => {
        if(error) return res.send({error})

        forecast(lat, lon, (fError, response) => {
            if(fError) return res.send({error})

            res.send({
                forecast: response,
                location,
                address
            })
        })
    })

    //res.send({
      //  forecast: 'It is snowing',
        //location: 'Philadelphia',
        //address: req.query.address
    //})
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})