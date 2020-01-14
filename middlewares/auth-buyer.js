const response = require('../utils/httpResponses');

const isBuyer = async (req, res, next) => {
    //check user is a seller;
    try {
        if (!req.user.member) return res.status(401).send(response.error(401, `Error: User must be a user.`));
        if (req.user.member.account_type !== 'buyer') return res.status(401).send(response.error(401, `Error: User must be a buyer.`));
        next()
    } catch (error) {
        return res.status(401).send(response.error(401, `Error: ${error.message}`));
    }
};
module.exports = isBuyer;
