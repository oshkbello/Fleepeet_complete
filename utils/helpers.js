/*
##################################################################
-- Name              : helpers.js
-- Creation Date     : 5-oct-2019
-- Author            : Mehmood
-- Reviewer          : Ahmad Raza
##################################################################
*/

const Joi = require('joi');
var jwt = require('jsonwebtoken');
const emailExistence = require("email-existence");
const HTTPRESPONSE = require('../utils/httpResponses');
const randomstring = require('randomstring');

module.exports = {
    GENERATE_TOKEN: (_id) => {
        process.env.JWT_SECRET = randomstring.generate();
        return jwt.sign({ id: _id }, process.env.JWT_SECRET);
    },
    ERROR_RESPONSE: (res, body) => {
        console.log(body)
        // res.status(meta.status).json(meta.message);
    },
    IS_AUTHORIZED: (headers) => {
        let token = headers['token'];
        if (token &&
            (tokensBlackList.length == 0 || tokensBlackList.length > 0 && CONSTANTS.FILTER_LIST(tokensBlackList, "token", token).length == 0) &&
            jwt.verify(token, CONSTANTS.SECRET_KEY) != undefined) {
            return true;
        }
        else {
            console.log('here')
            throw HTTPRESPONSE.UNAUTHORIZED("Invalid access token");
        }
    },
    SET_BLACK_LIST: (blackList) => {
        tokensBlackList = blackList;
    }
}
