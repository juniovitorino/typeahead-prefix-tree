require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser')
const { filterByPrefix, increasePopularity, filterByPopularity } = require('./routes')

const app = express();

app.use(bodyParser.json({ type: 'application/json' }))

app.get(`/typeahead/:prefix`, filterByPrefix);
app.get(`/typeahead`, filterByPopularity);
app.post(`/typeahead`, increasePopularity);

app.listen(process.env.PORT, () => {
  console.log(`Running on port http://${process.env.HOST}:${process.env.PORT}`);
});
