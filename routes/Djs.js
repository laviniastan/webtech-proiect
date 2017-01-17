var models = require("../models");
var express = require("express");
var router = express.Router();


var Dj =models.names[2];

// create a recipe
router.post('/djs', function(request, response) {
    Dj.create(request.body).then(function(djs) {
        Dj.findById(djs.id).then(function(djs) {
            response.status(201).send(djs);
        });
    });

});
//returns all 
router.get('/djs', function(request, response) {
    Dj.findAll().then(function(djs) {
        response.status(200).send(djs);
    });

});
//returns one recipe by id
router.get('/djs/:id', function(request, response) {
    Dj.findById(request.params.id).then(function(djs) {
        if (djs) {
            response.status(200).send(djs);
        }
        else {
            response.status(404).send();
        }
    });

});
//update a specific dj by id
router.put('/djs/:id', function(request, response) {
    Dj
        .findById(request.params.id)
        .then(function(hit) {
            if (hit) {
                hit
                    .updateAttributes(request.body)
                    .then(function() {
                        response.status(200).send('updated');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(500).send('server error');
                    });

            }
            else {
                response.status(400).send();
            }
        });

});
//delete a specific recipe by id
router.delete('/djs/:id', function(request, response) {
    Dj
        .findById(request.params.id)
        .then(function(hit) {
            if (hit) {
                hit.destroy().then(function() {
                        response.status(200).send('deleted');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(500).send('server error');
                    });
            }
            else {
                response.status(404).send('nu exista');
            }
        });

});

module.exports = router;
