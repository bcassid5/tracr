var mongoose = require('mongoose');
var usersSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        userName: String,
        email: String,
        dateCreated: Date,
    }
);

var Users = mongoose.model('user', usersSchema);
exports.Model = Users;