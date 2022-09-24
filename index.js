require("dotenv").config();

const express = require("express");
const { filterByPrefix } = require('./services')
const app = express();

app.get(`/typeahead/:prefix`, filterByPrefix);

app.listen(process.env.PORT, () => {
  console.log(`Running on port http://${process.env.HOST}:${process.env.PORT}`);
});
