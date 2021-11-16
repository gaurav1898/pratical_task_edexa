const mongoose = require('mongoose');
const UserSchema = require('../models/user');
const UserService = require('../services/UserService');
const roleList = require('../seed/Roles')
const Token = require('../handler/genToken');
var config = require('config');

exports.Add = (req, res, next) => {
    let formData = new UserSchema({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        proPic: req.file.filename,
        email: req.body.email,
        password: req.body.password
    })

    UserService.Add(formData, (err, user) => {
        if (err) {
            let message = [];
            console.log("Test", err);
            if (err.errors.name)
                message.push("Invalid Field Name");
            if (err.errors.proPic)
                message.push("Invalid Field Profile Picture");
            if (err.errors.email)
                message.push("Invalid Field Email");
            if (err.errors.password)
                message.push("Invalid Field Password");

            return res.json({
                success: false,
                err_subject: "Error !!",
                err_message: err
            })
        }
        else {
            if (user) {
                const token = Token.generateToken(user);
                console.log("Test", token);
                return res.json({
                    success: true,
                    name: user.name,
                    token: token

                })
            } else {
                return res.status(400).json({
                    success: false,
                    err_subject: "Oops",
                    err_message: "Something went wrong. Please contact technical support"
                })
            }

        }

    })
}

exports.SignIn = (req, res, next) => {
    console.log("Processing Login");
    console.log(req.body);

    console.log(req.body.email)
    UserService.findUserByRole(req.body.email, roleList.Roles, (err, user) => {
        if (err) {
            console.log(err)
            res.status(400).json({
                success: false,
                err_subject: "Authentication Error",
                err_message: err
            })
        }
        if (!user) {
            console.log("Invalid email, username, password");
            res.status(400).json({
                success: false,
                err_subject: "Authentication Error",
                err_message: "Invalid Authentication, Please check your login name and password"
            });
        }
        if (req.body !== null) {
            UserService.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    console.log("Invalid Password")
                    res.status(400).json({
                        success: false,
                        err_subject: "Authentication Error",
                        err_message: "Invalid Authentication, Please check your login name and password"
                    });
                }
                if (isMatch) {
                    console.log("user found")
                    if (user) {
                        const token = Token.generateToken(user);
                        return res.json({
                            success: true,
                            role: user.roles,
                            token: "JWT " + token
                        })
                    } else {
                        return res.status(400).json({
                            success: false,
                            err_subject: "Oops",
                            err_message: "Something went wrong. Please contact technical support"
                        })
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        err_subject: "Authentication Error",
                        err_message: "Wrong Password"
                    })
                }
            })

        }

    })
}