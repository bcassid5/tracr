var express = require('express');
var router = express.Router();
var userData = require('../models/user');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');

router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        //gets all schools using find which finds all records for the given collection
        if(request.query.userName){
            console.log('getting username');
            console.log(request.query.userName);
            userData.Model.findOne({"userName": request.query.userName}, function (error, data) {
                if (error) {
                    //ensures error catching
                    response.send({error: error});
                }
                else {
                    //return the data in json format
                    response.json({users: data});
                    //console.log(data);
                }
            });
        } else {
            userData.Model.find(function (error, data) {
                if (error) {
                    //ensures error catching
                    response.send({error: error});
                }
                else {
                    //return the data in json format
                    response.json({users: data});
                    //console.log(data);
                }
            });
        }
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        console.log(request.body.user);
        var newUser = new userData.Model(request.body.user);
        newUser.save(function (error) {
            if (error) response.send(error);
            response.json({user: newUser});
        });
    });

router.route('/:user_name')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        //takes in the parameter from the route (i.e. :slug) and queries the collection for that slug
        userData.Model.find({"userName": request.params.user_name}, function (error, data) {
            if (error) {
                //ensures error catching
                response.send({error: error});
            }
            else {
                //return the data in json format
                response.json({user: data});
            }
        });
    });
    
module.exports = router;