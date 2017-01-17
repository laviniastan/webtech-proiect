var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = new express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + "/admin"));

var nodeadmin=require("nodeadmin");
app.use(nodeadmin(app));

var Sequelize = require('sequelize')
var models = require("./models"); 
var sequelize = models.sequelize;

//definire entitati 
var dj = require(__dirname + "/routes/Djs.js");
app.use(dj);

var hits = require(__dirname + "/routes/Hits.js");
app.use(hits);

var link = require(__dirname + "/routes/Links.js");
app.use(link);


app.get('/create', (request, response) => {
    sequelize
        .sync({
            force: true
        })
        .then(() => {
            response.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            response.status(500).send('error')
        })
})

app.listen(process.env.PORT);
app.listen(process.env.IP);
//app.listen(8080);
