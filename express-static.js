require('./static-content/lib/constants.js');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('static-content')); 
app.use(express.static('pkl-poj-json')); 


app.listen(wwPort, function () {
    console.log('Example app listening on port ' + wwPort);
});