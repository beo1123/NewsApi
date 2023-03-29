const passport = require("passport");

const ensureAuthenticated = passport.authenticate("jwt", {session: false});

const ensureAuthorized = (role) => (req, res, next) => {
    if(role.includes(req.user.role)) {
        return next();
    }
    return res.status(401).json({
        message: "Unauthorized",
        success: false
    });
};

module.exports = {
    ensureAuthenticated, ensureAuthorized
}