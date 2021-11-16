const User = require('../models/user');
var config = require('config');
const bcrypt = require('bcrypt');
module.exports.Add = function (newUser, callback) {
    newUser.save(callback);
}

module.exports.findUserByRole = function (email, role, callback) {
    const queryByEmail = {
        email: email,
        "roles": { $in: role }
    }
    User.findOne(queryByEmail, callback)
}

module.exports.comparePassword = function (password, hashPassword, callback) {
    bcrypt.compare(password, hashPassword, (err, isMatch) => {
        console.log("hashpassword :" + hashPassword)
        if (err) throw err;
        callback(null, isMatch);
    });
}