require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes")
const morgan = require("morgan");
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(route)
require("./database/database").connect();
app.use(cors());
app.use(morgan("tiny"));


app.get((request, response) => {
  response.json(200, { responseMessage: " Welcome to our Todo App" });
});

module.exports = app;
