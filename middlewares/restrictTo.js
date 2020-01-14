const response = require('../utils/httpResponses');
const jwt = require('jsonwebtoken');

const restrictTo = async (req, res, next) => {
    // check user authentication status;?
    console.log('role')
    const roles = ['admin']
    if (!roles.includes(req.user.role)) {
        return res.status(401).json({ message: "Access Denied..!" });
    }
    next();
};
module.exports = restrictTo;
