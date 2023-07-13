/* eslint-disable */
// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/
//https://api.chucknorris.io/jokes/random'
/* eslint-disable */
const fetch = require('node-fetch');

exports.handler = async function(event, context) {

  const apiKey = 'gSykEwZBvkLDrQSbX0lRZKEPRUgZKq29NQjmMyx7u5o';
  const address = encodeURIComponent(event.queryStringParameters.address);

  console.log('address:');
  console.log(address);

  try {
   // const response = await operator.thng(thngId).read();

    const url = `https://geocoder.ls.hereapi.com/search/6.2/geocode.json?languages=en-US&maxresults=4&searchtext=${address}&apiKey=${apiKey}`;
    const response = await fetch(url);

    //console.log('response:');
    //console.log(response);

    if (!response) {
      // NOT res.status >= 200 && res.status < 300
      return { error: 'error'/*statusCode: thngResponse.status, body: thngResponse.statusText*/ }
    }

    const data = await response.json();

    if(Object.prototype.hasOwnProperty.call(data, 'Response')){

      if(typeof data.Response !== 'undefined'){
        if(!Array.isArray(data.Response) && typeof data.Response == 'object') {
          if (Object.prototype.hasOwnProperty.call(data.Response, 'View')) {
            let view = data.Response.View;


              if (typeof view !== 'undefined'){
              if(Array.isArray(view) && typeof view === 'object') {
                if (view.length > 0) {

                  let firstView = view[0];
                  if (typeof firstView === 'object' && !Array.isArray(firstView)) {
                    if (Object.keys(firstView).length > 0) {


                      if (Object.prototype.hasOwnProperty.call(firstView, 'Result')) {
                        if (typeof firstView.Result !== 'undefined') {
                          let result = firstView.Result;
                          if (typeof result === 'object' && Array.isArray(result)) {


                            if (result.length > 0) {
                              if (typeof firstView.Result[0] !== 'undefined') {


                                let firstResult = firstView.Result[0];
                                if (typeof firstResult === 'object' && !Array.isArray(firstResult)) {
                                  if (Object.keys(firstResult).length > 0) {


                                    if (Object.prototype.hasOwnProperty.call(firstResult, 'Location')) {
                                      if (typeof firstResult.Location !== 'undefined') {
                                        let location = firstResult.Location;
                                        if (typeof location === 'object' && !Array.isArray(location)) {
                                          if (Object.keys(location).length > 0) {


                                            if (Object.prototype.hasOwnProperty.call(location, 'DisplayPosition')) {
                                              if (typeof location.DisplayPosition !== 'undefined') {
                                                let displayPos = location.DisplayPosition;
                                                if (typeof displayPos === 'object' && !Array.isArray(displayPos)) {
                                                  if (Object.keys(displayPos).length > 0) {
                                                    let latLngIsValid = 0;
                                                    let lat = null;
                                                    let lng = null;


                                                    if (Object.prototype.hasOwnProperty.call(displayPos, 'Latitude')) {
                                                      if (typeof displayPos.Latitude !== 'undefined') {
                                                        lat = displayPos.Latitude;
                                                        if (typeof lat === 'number' && isNaN(displayPos)) {
                                                          latLngIsValid++;
                                                        }
                                                      }
                                                    }
                                                    if (Object.prototype.hasOwnProperty.call(displayPos, 'Longitude')) {
                                                      if (typeof displayPos.Longitude !== 'undefined') {
                                                        lng = displayPos.Longitude;
                                                        if (typeof lng === 'number' && isNaN(displayPos)) {
                                                          latLngIsValid++;
                                                        }
                                                      }
                                                    }

                                                    if (latLngIsValid === 2) {

                                                      let coords = {lat: lat, lng: lng};
                                                      return {
                                                        statusCode: 200,
                                                        body: JSON.stringify(coords)
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(null)
    }

  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg2: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
};
