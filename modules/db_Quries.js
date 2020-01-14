/*
##################################################################
-- Name              : db_Quries.js
-- Creation Date     : 5-oct-2019
-- Author            : Aqib Ijaz
-- Reviewer          :
##################################################################
*/

const HTTPRESPONSE = require('../utils/httpResponses');
const Boom = require('boom');
module.exports = {
    GetOne: async (modal, condition = {}) => {
        try {
            let result = await modal.findOne(condition);
            return result;
        } catch (error) {
            return Promise.reject(Boom.notFound("Record not found."))
            // throw HTTPRESPONSE.NOT_FOUND("Record not found.");
        }
    },

    Get: async (modal, condition = {}) => {
        try {
            let result = await modal.find(condition);
            return result;
        } catch (error) {
            throw HTTPRESPONSE.NOT_FOUND("Record not found.");
        }
    },

    Create: async (modal, data) => {
        try {
            let result = await modal.create(data);
            return result;
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    Edit: async (modal, condition, data) => {
        try {

            let result = await modal.findOneAndUpdate(condition,
                data, {
                upsert: true,
                new: true
            })
            return result;
        } catch (error) {
            throw HTTPRESPONSE.error("Record not updated.");;
        }
    },

    Delete: async (modal, _id) => {
        try {
            let result = await modal.deleteOne({ _id });
            return result;
        } catch (error) {
            console.log(error);
            throw HTTPRESPONSE.error("Record not deleted.");;
        }
    }


}
