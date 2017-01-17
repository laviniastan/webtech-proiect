var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = new express();
app.use(bodyParser.json());
app.use(cors());

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


app.get('/create', (req, res) => {
    sequelize
        .sync({
            force: true
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.listen(process.env.PORT);
//app.listen(8080);
