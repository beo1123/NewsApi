const  { check, validationResult } = require("express-validator");

const validateRule = () => {
    return [
        check("body").trim().isLength({ min: 2}).withMessage("Body must be at least 2 characters long"),

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