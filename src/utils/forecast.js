import req from 'postman-request'

const forecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=aba8071f3f38cfa07e3952912e61ad83&query=${lat},${lon}&units=f`

    req({url, json: true}, (err, {body}) => {
        if(err){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            const {temperature, feelslike ,weather_descriptions: weather_desc} = body.current
            const text = `It is currently ${temperature} degress out. It feels like ${feelslike} degress out`
            const desc = `${weather_desc[0]}. `
            callback(undefined, desc + text)
        }
    })
}

export default forecast