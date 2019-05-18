// Optional: Chatbot
// + Text Cleaning Process



'use strict';

const express = require('express');  // State the basic RESTful API (TOOD: state?)
const bodyParser = require('body-parser');
const axios = require('axios');
const https = require('https');      // Make the request to ShipEngine, FTL API
const app = express();
const cors = require('cors');
const API_KEY=process.env.API_KEY;



// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(cors());



const rootUrl = '/api/v1/';
const validateAddrUrl = rootUrl + 'validateaddress/';


// rootUrl: /
app.get(rootUrl, (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});




// validateAddrUrl
app.post(validateAddrUrl, async (req, res) => {

    // TODO: get the api key from the header
    // let se_apikey = process.env.API_KEY;
    let se_apikey = API_KEY;
    // let se_addr = {
    //         address_line1: req.body.address,
    //         country_code: 'US'
    // };
    let se_addr =req.body.address;
    console.log(req.body.address);

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
        // var res_msg = response.data;

        console.log(response.data);
    } catch (e) {
        console.log(e);

    }

   return res.status(200).send({
        status: res_msg
    })
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
