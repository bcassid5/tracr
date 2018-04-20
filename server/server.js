var express = require('express'); 
var mongoose = require('mongoose');
var app = express(); 
var servlog = require('./server-log');


//Add route links here
//Data
var transRoute = require('./routes/transaction');
var userRoute = require('./routes/user');
var houseRoute = require('./routes/house');

app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

mongoose.connect('mongodb://root:root@ds227119.mlab.com:27119/house', {useMongoClient: true}, function(err){
    if(err) {
        console.log('Some problem with the connection ' +err);
    } else {
        console.log('The mongodb connection is ready');
    }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(servlog);

//Set app uses
//Data
app.use('/transactions', transRoute);
app.use('/users', userRoute);
app.use('/houses', houseRoute);

//Listen
app.listen(3700, function () {
    console.log('Server Listening: Port 3700');
});