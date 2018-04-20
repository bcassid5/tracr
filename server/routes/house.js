var express = require('express');
var router = express.Router();
var houseData = require('../models/house');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');

router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        houseData.Model.find(function (error, data) {
            if (error) {
                //ensures error catching
                response.send({error: error});
            }
            else {
                //return the data in json format
                response.json({houses: data});
                //console.log(data);
            }
        });  
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newHouse = new houseData.Model(request.body.house);
        newHouse.save(function (error) {
            if (error) response.send(error);
            response.json({houses: newHouse});
        });
    });

module.exports = router;