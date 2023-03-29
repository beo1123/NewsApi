const router = require("express").Router();
const{ ensureAuthenticated, ensureAuthorized } = require("../middleware/auth-Middleware");
const {  
    login,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    verifiy } = require("../Controller/authController");

const { validateRule, validate} = require("../validation/userValidator");
const { validateRule: passwordValidateRules, validate: passwordValidate} = require("../validation/changPasswordValidator");


router.post("/login", async(req,res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/LoginModel" }
    } */
        await login(req.body,res);
});

router.post("/register",validateRule(), validate, async(req,res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/RegisterModel" }
    } */
    await register(req.body, "user", res);
});

router.post("/verify", async(req,res) => {
     /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/VerifyEmailModel" }
    } */
    await verifiy(req.body, res);
});

router.post("/fogotPassword", async(req,res) => {
     /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ForgotPassWordModel" }
    } */
    await forgotPassword(req.body, res);
});

router.post("/resetPassword", passwordValidateRules(), passwordValidate, async(req,res) => {
    /*  #swagger.tags = ['Auth']
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ResetPasswordModel" }
    } */
    await resetPassword(req.body, res);
});

router.post("/changePassword", ensureAuthenticated, passwordValidateRules(), passwordValidate, async(req,res) => {
    /*  #swagger.tags = ['Auth']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/ChangePasswordModel" }
    } */
    await changePassword(req, res);
});

module.exports = router;