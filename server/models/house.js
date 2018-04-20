var mongoose = require('mongoose');
var housesSchema = mongoose.Schema(
    {
        description: String,
        amount: Number,
        date: String,
        split: Number,
        finalAmount: Number,
    }
);

var Houses = mongoose.model('house', housesSchema);
exports.Model = Houses;