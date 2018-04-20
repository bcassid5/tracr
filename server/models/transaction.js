var mongoose = require('mongoose');
var transactionsSchema = mongoose.Schema(
    {
        description: String,
        amount: Number,
        date: String,
        split: Number,
        finalAmount: Number,
        user: {type: mongoose.Schema.ObjectId, ref: ('Users')},
    }
);

var Transactions = mongoose.model('transaction', transactionsSchema);
exports.Model = Transactions;