// Optional: Chatbot
// + Text Cleaning Process



'use strict';

const express = require('express');  // State the basic RESTful API (TOOD: state?)
const bodyParser = require('body-parser');
const axios = require('axios');
const https = require('https');      // Make the request to ShipEngine, FTL API
const app = express();
const cors = require('cors');

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
});


// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



const rootUrl = '/api/v1/';
const validateAddrUrl = rootUrl + 'validateaddress/';
const getCoordinatesUrl = rootUrl + 'getcoordinates/';
const getCarriers = rootUrl + 'getcarriers/';
const getRates = rootUrl + 'getrates/';
const opTags = rootUrl + 'tags/';


// Helper function
const calDistBetweenCoords = function(lat1, lng1, lat2, lng2) {
    var R = 6371e3; // metres
    var p1 = lat1.toRadians();
    var p2 = lat2.toRadians();
    var dlat = (lat2-lat1).toRadians();
    var dlng = (lng2-lng1).toRadians();

    var a = Math.sin(dlat/2) * Math.sin(dlat/2) +
            Math.cos(p1) * Math.cos(p2) *
            Math.sin(dlng/2) * Math.sin(dlng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
}


// rootUrl: /
app.get(rootUrl, async (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});


// validateAddrUrl
app.post(validateAddrUrl, async (req, res) => {

    // TODO: get the api key from the header
    let se_apikey = process.env.API_KEY;
    // let se_addr = {
    //         address_line1: req.body.address,
    //         country_code: 'US'
    // }
    let se_addr = {
        "address_line1": "500 South Buena Vista Street",
        "postal_code": "91521",
        "country_code": "US"
      };

    try {
        let response = await axios.request({
            url: "https://api.shipengine.com/v1/addresses/validate",
            method: "POST",
            headers: {
                "API-KEY": se_apikey,
                "Content-Type": "application/json"
            },
            data: [se_addr]
        });
        var res_msg = response.data[0].status;

        console.log(response.data);
    } catch (e) {
        console.log(e);
        console.log(se_apikey);
    }

    return res.status(200).send({
        status: res_msg
    })
});


// getcoordinates
app.get(getCoordinatesUrl, async (req, res) => {
    // validate the address?
    if (!req.query.address) {
        return res.status(400).send({
            message: "Please provide the address you want to look up."
        })
    }

    var msg = "Fail query location from google map with address.";

    // Geocode an address.
    googleMapsClient.geocode({
        address: req.query.address
    }, function(err, response) {
        if (!err) {
            let lat = response.json.results[0]["geometry"]["location"]["lat"];
            let lng = response.json.results[0]["geometry"]["location"]["lng"];
            msg = response.json.results;
            return res.status(200).send({
                message: "The location of " + req.query.address + " is (lat, lng) = ("
                        + lat + ", " + lng + ")"
            });
        } else {
            return res.status(400).send({message: msg});
        }
    });

});

// listPlaces
app.get(getCarriers, async (req, res) => {
    if (!req.query.lat || !req.query.lng) {
        return res.status(400).send({
            message: "Please provide the location you want to search carriers for."
        })
    }

    // Find the carriers around the coordinates
    var res_fedex = [];
    try {
        await googleMapsClient.placesNearby({
            keyword: "fedex",
            location: req.query.lat+","+req.query.lng,
            radius: 1500
        }, function(err, response) {
            if (!err) {
                for (var value of response.json.results) {
                    let lat1 = req.query.lat;
                    let lng1 = req.query.lng;
                    let lat2 = value["geometry"]["location"]["lat"];
                    let lng2 = value["geometry"]["location"]["lng"];

                    res_fedex.push(
                        {
                            name: value["name"],
                            distance: calDistBetweenCoords(lat1, lng1, lat2, lng2)
                        }
                    );
                }
                console.log(res_fedex);
            }
        });
    } catch (e) {
        console.log(e);
    }

    return res.status(200).send({message: res_fedex});

})

// estimate rates
app.post(getRates, async (req, res) => {
    console.log(req.body);
    if (!req.body.toAddr || !req.body.fromAddr || !req.body.weight) {
        return res.status(400).send({
            message: "Please provide all toAddr, fromAddr and weight"
        })
    }

    let se_apikey = process.env.API_KEY;

    try {

        let response = await axios.request({
            url: "https://api.shipengine.com/v1/rates/estimate",
            method: "POST",
            headers: {
                "API-KEY": se_apikey,
                "Content-Type": "application/json"
            },
            data: {
                "carrier_ids": [
                    "se-103309",
                    "se-103310"
                ],
                "to_country_code": "US",
                "to_postal_code": req.body.toAddr.zip,
                "from_country_code": "US",
                "from_postal_code": req.body.fromAddr.zip,
                "weight": req.body.weight
            }

        });
        var res_msg = response.data;

        console.log(response.data);
    } catch (e) {
        console.log(e.response.data);
        console.log(se_apikey);
    }

    return res.status(200).send({
        status: res_msg
    })

});

// // tags
// app.route(opTags)
//     .get(async (req, res) => { // get the tags by user name
//         if (!req.query.order) {
//             return res.status(401).send({
//                 message: "Please provide order number" 
//             });
//         }

//         return res.status(200).send({
//             status: req.query.key
//         });

//     })
//     .post(async (req, res) => { // add record to the database
//     });



// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
