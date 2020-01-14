const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const generateToken = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: process.env.TOKENEXPIRESIN,
        });
    } catch (error) {
        return error;
    }
};

const decodeToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWTSECRET);
    } catch (error) {
        return error;
    }
};

module.exports = {
    decodeToken,
    generateToken,
};
