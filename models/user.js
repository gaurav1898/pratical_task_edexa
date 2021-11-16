const mongoose = require('mongoose');
const roles = require('../seed/Roles');

const SCHEMA = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true
    },
    proPic: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        index: true,
        match: [/\S+@\S+\.\S+/, "Invalid"]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: roles.Roles,
        default: "User"
    }
})

const User = module.exports = mongoose.model('User', SCHEMA);