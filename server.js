const express = require('express');
const method_override = require('method-override');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const router = require("./controllers/burgers_controllers.js");

app.use("/", router);

app.listen(PORT);
