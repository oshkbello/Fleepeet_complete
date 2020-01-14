const response = require('../utils/httpResponses');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../modals/User');

const authenticated = async (req, res, next) => {
    // check user authentication status;?

    const token = req.header('x-auth-token');

    //Check for JWT TOken
    if (!token)return res.status(401).json({ message: "Token Authorization Denied..!" });

    try {
        //Verify Token 
        const decoded = jwt.verify(token, process.env.JWTSECRET);

        //assign User to Req.user
        req.user = decoded.user;
        
        next();

    } catch (err) {
        res.status(400).json({ message: "Please Login..." });
    }
};
module.exports = authenticated;
