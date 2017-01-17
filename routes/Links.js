'use strict'
var models = require("../models");
var express = require("express");
var router = express.Router();

var Hit = models.names[0];
var Link = models.names[1];
var DJ = models.names[2];

DJ.hasMany(Link, {
    foreignKey: 'idHit'
});
Link.belongsTo(DJ, {
    foreignKey: 'idHit'
});

Hit.hasMany(Link, {
    foreignKey: 'idHit'
});

Link.belongsTo(Hit, {
    foreignKey: 'idHit'
});




router.post('/links', function(request, response) {
    Link.create(request.body).then(function(link) {
        Link.findById(link.id).then(function(link) {
            response.status(201).send(link);
        });
    });

});

router.get('/links', function(request, response) {
    Link.findAll().then(function(links) {
        response.status(200).send(links);
    });

});

router.get('/links/:id', function(request, response) {
    Link.findById(request.params.id).then(function(link) {
        if (link) {
            response.status(200).send(link);
        }
        else {
            response.status(404).send();
        }
    });

});


router.get('/Links/:id/Djs', (req, res) => {
    Link
        .findAll({
            where: {
                idHit: req.params.id
            },
            include: [Hit, DJ]
        })
        .then((DJ) => {
            res.status(201).send(DJ);
        })
});


router.post('/Links/:id/Djs', (req, res) => {
    Link
        .find({
            where: {
                idHit: req.params.id
            }
        })
        .then((link) => {
            var dj = req.body
            DJ.find({
                    where: {
                        name: dj.name
                    }
                })
                .then(function(djFound) {
                    var newrec = {}
                    newrec.idHit = req.params.id;
                    if (djFound) {
                       
                        newrec.idHit = djFound.id;
                        return Link.create(newrec)
                    }
                    else {
                        
                        var newDj = {};
                        newDj.name = dj.name;
                        newDj.email = dj.email;
                        newDj.phone = dj.phone;
                        newDj.radio=dj.radio;
                        DJ.create(newDj).then(function(dj) {
                            DJ.findById(dj.id).then(function(dj) {
                                newrec.id = dj.id;
                                return Link.create(newrec)

                            });
                        });
                    }
                })
        })
        .then(() => {
            res.status(201).send('created')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

})

router.put('/links/:id', function(request, response) {
    Link
        .findById(request.params.id)
        .then(function(link) {
            if (link) {
                link
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

router.put('/Links/:id/Djs', (req, res) => {
    Link
    
        .find({
            where: {
                idHit: req.params.id,
                id: req.body.id_recipe
            }
        })
        .then((link) => {
           
            DJ
            .find({
                where: {
                    id : link.id
                }
            }).then((dj) => {
                dj.name = req.body.DJ.name;
                dj.emil = req.body.DJ.email;
                dj.phone=req.body.DJ.phone;
                dj.radio=req.body.Dj.radio;
                return dj.save();
            })
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })

});

router.delete('/links/:id', function(request, response) {
    Link
        .findById(request.params.id)
        .then(function(link) {
            if (link) {
                link.destroy().then(function() {
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

})

module.exports = router;
