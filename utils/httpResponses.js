/*
##################################################################
-- Name              : httpResponses.js
-- Creation Date     : 5-oct-2019
-- Author            : Aqib Ijaz
-- Reviewer          :
##################################################################
*/

module.exports = {

    success: (statusCode, message, data) => {
        return {
            success: true,
            statusCode,
            message,
            data,
        };
    },

    error: (statusCode, message) => {
        return {
            error: true,
            statusCode,
            message,
        };
    },

    output: (statusCode, message, data, meta) => {
        return {
            error: false,
            statusCode,
            message,
            data,
            meta,
        };
    },

}