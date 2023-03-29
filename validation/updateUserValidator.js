const  { check, validationResult } = require("express-validator");

const validateRule = () => {
    return [
        check("name").trim().isLength({ min: 1, max: 20 }).withMessage("Title must be between 1 and 20 characters"),

    ];
};

const validate =(req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    const resultErrors = [];
    errors.array().map((err) => resultErrors.push({[err.param]: err.mss}));
    resultErrors.push({message: "Action unsuccessful"});
    resultErrors.push({success: false});
    const errorObject = Object.assign({}, ...resultErrors);
    return res.status(422).json(errorObject);
};

module.exports = {
    validateRule,
    validate
}