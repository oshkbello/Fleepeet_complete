const Boom = require('boom');
const schemas = require('../schemas');
const { ERROR_RESPONSE } = require('../utils/helpers');

module.exports = (req, res, next) => {
    let schema = schemas;
    req.originalUrl.split('/').forEach(path => {
        if (!path.trim()) {
            return;
        }
        schema = schema[path];
    });
    let { error } = schema.validate(req.body);
    if (error) {

        return ERROR_RESPONSE(res, Boom.badRequest(error));
    }
    console.log('Schema Validated');
    return next();
}
