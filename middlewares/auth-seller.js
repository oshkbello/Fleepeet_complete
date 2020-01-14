const response = require('../utils/httpResponses');

const isSeller = async (req, res, next) => {
    //check user is a seller;
    try {
        // if (!req.user.member) return res.status(401).send(response.error(401, `Error: User must be a user.`));
        if (req.user.accountType === 'Seller' || req.user.accountType === 'Member'){
            if(req.user.accountType === 'Member'){
                if(req.user.tickets === 0){
                    return res.status(401).send(response.error(401, `Error: You Don't Have Available Tickets Please Buy Ticket First. `));
                }
            }
            next()
            
        } 
        return res.status(401).send(response.error(401, `Error: User must be a Seller or Member. `));
    } catch (error) {
        return res.status(401).send(response.error(401, `Error: ${error.message}`));
    }
};
module.exports = isSeller;
