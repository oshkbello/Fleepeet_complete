const response = require("../utils/httpResponses");
const NewLetter = require("../modals/NewsLetter");
const isSubscribed = async (req, res, next) => {
  //check is NewsLetter is Already Subscribed;
  try {
    const { email } = req.body;
    const user = await NewLetter.findOne({ email: email });
    if (user.condition === true) {
      return res
        .status(401)
        .send(response.error(401, `You Have already Subscribed to NewsLetter`));
    }
    next();
  } catch (error) {
    return res.status(401).send(response.error(401, `Error: ${error.message}`));
  }
};
module.exports = isSubscribed;
