/*
##################################################################
-- Name              : user.js
-- Creation Date     : 5-oct-2019
-- Author            : Mehmood
-- Reviewer          :
##################################################################
*/

"use strict";


module.exports = (mongoose) => {
    const bcrypt = require('bcryptjs');
    const jwt = require('../utils/jwt');

    const Schema = mongoose.Schema;
    const usersSchema = new Schema({
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        conformPassword: {
            type: String,
            required: true
        },
        role: {
            type: String,
            lowercase: true,
            enum: ['user', 'admin'],
            default: 'user'
        },
        profile_image: {
            type: String,
        },
        accountType: {
            type: String,
            enum: ['student', 'non-student'],
            required: true,
        },
        school: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        updatedAt: {
            type: Date,
            default: Date.now()
        },
        tickets: {
            type: Number,
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        status: {
            type: String,
            enum: ['active', 'deactive', 'suspend'],
            default: 'deactive'
        },
        passwordResetToken: String,
        passwordResetExpires: Date,
    });

    usersSchema.methods.comparePassword = async function (userPassword, next) {
        try {
            return await bcrypt.compare(userPassword, this.password);
        } catch (error) {
            return next(error)
        }
    };


    usersSchema.methods.authData = async function (next) {
        try {
            let userObj = this.toObject();
            delete userObj.password;
            const token = await jwt.generateToken(userObj);
            let decoded = jwt.decodeToken(token);
            let data = {};
            data.user = userObj;
            data.token = token;
            data.expiry = decoded.exp;
            return data;
        } catch (error) {
            console.log(error);
            return next(error)
        }
    };
    return mongoose.model('users', usersSchema);
};
