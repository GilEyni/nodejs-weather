import req from 'postman-request'

const geoCode = (address, callback) => {
    address = encodeURIComponent(address)
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ2lsZXluaSIsImEiOiJjbHQxcXBqZjYxOWt4MmxsaXNsdjJnaDZsIn0.sfuBAYP2GJXNTkAN7RurpQ&limit=1`

    req({url: mapboxUrl, json: true}, (err, {body}) => {

        if(err){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find address', undefined)
        }else{
            const {center, place_name: location} = body.features[0]
            const lat = center[1]
            const long = center[0]
            //const location = place_name
            callback(undefined, {lat, long, location})
        }
    })
}

export default geoCode