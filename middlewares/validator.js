const { checkSchema, validationResult } = require('express-validator');

const { signUpUserSchema } = require('../models/user');

const signUpValidator = (req, res, next) => {
    // const result = await checkSchema({
    //     email: { isEmail: true },
    //     pasword: { isLength: { options: { min: 8 } } },
    // }).run(req);

    // console.log("result....", result)
    checkSchema(signUpUserSchema);
    const result = validationResult(req);

    console.log("result....", result)

    if (!result.isEmpty()) {
        //console.log(result.)
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

module.exports = { signUpValidator };