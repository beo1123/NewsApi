const  { check, validationResult } = require("express-validator");

const validateRule = () => {
    return [
        check("title").trim().isLength({ min: 2, max: 256}).withMessage("Titile must be at between 2 and 256 characters"),
        check("body").trim().isLength({ min: 2}).withMessage("Youtube video id must be 11 characters"),

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