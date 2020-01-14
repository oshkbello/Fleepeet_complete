/*
##################################################################
-- Name              : user.js
-- Creation Date     : 5-oct-2019
-- Author            : Aqib Ijaz
-- Reviewer          :
##################################################################
*/

module.exports = (Joi) => {
    const register = {
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        accountType: Joi.string().required(),
        school: Joi.string(),
        memberType: Joi.string(),
        conformPassword: Joi.string(),
        city: Joi.string(),
        profile_image: Joi.object()

    }

    const forgetPassword = {
        email: Joi.string().email().required()
    }

    const login = {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }

    const updatePassword = {
        _id: Joi.string().required(),
        password: Joi.string().required()
    }


    const inviteByEmail = {
        _id: Joi.string().required(),
        invited_email: Joi.string().email().required()
    }

    const test = {
        id: Joi.string().required(),
    }

    return {
        register,
        forgetPassword,
        updatePassword,
        inviteByEmail,
        login,
        test
    }
}
