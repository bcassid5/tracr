var express = require('express');
var router = express.Router();
var transactionData = require('../models/transaction');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

var mongoose = require('mongoose');

router.route('/')
    .get(parseUrlencoded, parseJSON, function (request, response) {
        if (request.query.user){
            transactionData.Model.find({"user": request.query.user}, function (error, data) {
                if (error) {
                    //ensures error catching
                    response.send({error: error});
                }
                else {
                    //return the data in json format
                    response.json({transactions: data});
                    //console.log(data);
                }
            });
        } else {
            transactionData.Model.find(function (error, data) {
                if (error) {
                    //ensures error catching
                    response.send({error: error});
                }
                else {
                    //return the data in json format
                    response.json({transactions: data});
                    //console.log(data);
                }
            });
        }
    })
    .post(parseUrlencoded, parseJSON, function (request, response) {
        var newTrans = new transactionData.Model(request.body.transaction);
        newTrans.save(function (error) {
            if (error) response.send(error);
            response.json({transaction: newTrans});
        });
    });

router.route('/:transaction_id')
    .delete(parseUrlencoded, parseJSON, function (request, response) {
        
    transactionData.Model.findByIdAndRemove(request.params.transaction_id,
            function (error, deleted) {
                if (!error) {
                    response.json({transaction: deleted});
                }
            }
        );
    });

module.exports = router;