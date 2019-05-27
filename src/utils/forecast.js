//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require('request')

const forecast = (latitude, longtitude, callback) => {

    url = 'https://api.darksky.net/forecast/74f98b162f57eca8322f09469cbeb786/'+ latitude + ',' + longtitude + '?units=si'
    
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather forecast services', undefined)
        } else if (body.currently === undefined) {
            callback('The given location (or time) is invalid. Please re-enter parameters.')
        } else {
            callback (undefined, body.daily.data[0].summary + ` It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain. \n \n The daily high is ${body.daily.data[0].temperatureHigh}, and the daily low is ${body.daily.data[0].temperatureLow}.`)
        }
    })  
}

module.exports = forecast


//https://api.darksky.net/forecast/74f98b162f57eca8322f09469cbeb786/37.8267,-122.4233?units=si