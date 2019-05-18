'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();


const rootUrl = '/';


// rootUrl: /
app.get(rootUrl, (req, res) => {
  res
    .status(200)
    .send('Hello, world!')
    .end();
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
