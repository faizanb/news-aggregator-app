const { checkSchema, validationResult } = require('express-validator');

const { signUpUserSchema, signInUserSchema } = require('../models/user');

const signUpValidator = (req, res, next) => {
   
    checkSchema(signUpUserSchema);
    const result = validationResult(req);

    if (!result.isEmpty()) {
        req.validated = false;
        req.errors = result.array();
    } else {
        req.validated = true;
        req.user = {
            email: req.body.email,
            categories: req.body.categories,
            sources: req.body.sources 
        }
    }
    next();
}

const signInValidator = (req, res, next) => {
    checkSchema(signInUserSchema);
    const result = validationResult(req);

    if (!result.isEmpty()) {
        req.validated = false;
        req.errors = result.array();
    } else {
        req.validated = true;
    }
    next();
}

module.exports = { signUpValidator, signInValidator };