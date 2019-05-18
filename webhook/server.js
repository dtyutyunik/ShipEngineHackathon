// Optional: Chatbot
// + Text Cleaning Process



'use strict';

const express = require('express');  // State the basic RESTful API (TOOD: state?)
const bodyParser = require('body-parser');
const axios = require('axios');
const https = require('https');      // Make the request to ShipEngine, FTL API
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));



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
    let se_apikey = process.env.API_KEY;
    let se_addr = {
            name: 'Mickey',
            phone: '714-781-4565',
            company_name: 'The Walt Disney Company',
            address_line1: req.body.address,
            city_locality: 'Burbank',
            state_province: 'CA',
            postal_code: '91521',
            country_code: 'US'
    };

    try {
        let response = await axios.post("https://api.shipengine.com/v1/addresses/validate", {
            headers: {
                "API-KEY": se_apikey,
                "Content-Type": "application/json"
            },
            data: se_addr
        });

       console.log(response.data);
    } catch (e) {
        console.log(e);
        console.log(se_apikey);
    }

    // let options = {
    //     "method": "POST",
    //     "hostname": "https://api.shipengine.com/",
    //     "path": "v1/addresses/validate",
    //     "headers": {
    //         "Content-Type": "application/json",
    //         "api-key": se_apikey
    //     }
    // };


    // let sereq = https.request(options, function (seres) {

    //     seres.on("data", (data) => {
    //         console.log("response from se: "+ data);
    //     });

    //     // res.on("end", function () {
    //     //     var body = Buffer.concat(chunks);
    //     //     console.log(body.toString());
    //     // });
    // });

    // sereq.write(JSON.stringify([
    //     {
    //         name: 'Mickey',
    //         phone: '714-781-4565',
    //         company_name: 'The Walt Disney Company',
    //         address_line1: req.body.address,
    //         city_locality: 'Burbank',
    //         state_province: 'CA',
    //         postal_code: '91521',
    //         country_code: 'US'
    //     }
    // ]));
    // // req.end();
    // console.log("apikey: " + apikey);
    return res.status(200).send({
        success: 'true'
    })
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
