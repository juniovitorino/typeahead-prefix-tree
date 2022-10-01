require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser')

const {
  filterByPrefix,
  increasePopularity,
  filterByPopularity
} = require('./routes')

const server = express();

server.use(bodyParser.json({ type: 'application/json' })) // Add bodyParser middleware

// Routes
server.get(`/typeahead/:prefix`, filterByPrefix);
server.get(`/typeahead`, filterByPopularity);
server.put(`/typeahead`, increasePopularity);

server.listen(process.env.PORT, () => {
  console.log(`Running on port http://${process.env.HOST}:${process.env.PORT}`);
});
