const  { check, validationResult } = require("express-validator");

const validateRule = () => {
    return [
        
        check("oldPassword").trim().isLength({ min: 6, max: 16 }).withMessage("Password must be between 6 and 6 characters"),
        check("newPassword").trim().isLength({ min: 6, max: 16 }).withMessage("New password must be between 6 and 6 characters"),

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