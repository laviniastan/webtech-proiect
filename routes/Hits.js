var models = require("../models");
var express = require("express");
var router = express.Router();


var Hit = models.names[0];

//create
router.post('/hits', function(request, response) {
    Hit.create(request.body).then(function(hits) {
        Hit.findById(hits.id).then(function(hits) {
            response.status(201).send(hits);
        });
    });

});

router.post('/hits', function(request,response) {
    Hit.create(request.body).then(function(){
      response.status(201).send;
    }).catch(function(err){
      console.warn(err);
    })
});
//returns all hits
router.get('/hits', function(request, response) {
    Hit.findAll().then(function(hits) {
        response.status(200).send(hits);
    });

});
//returns one hit by id
router.get('/hits/:id', function(request, response) {
    Hit.findById(request.params.id).then(function(hits) {
        if (hits) {
            response.status(200).send(hits);
        }
        else {
            response.status(404).send();
        }
    });

});
// update a specifichit by id
router.put('/hits/:id', function(request, response) {
    Hit
        .findById(request.params.id)
        .then(function(hits) {
            if (hits) {
                hits
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
// delete an hit by id
router.delete('/hits/:id', function(request, response) {
    Hit
        .findById(request.params.id)
        .then(function(hits) {
            if (hits) {
                hits.destroy().then(function() {
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
