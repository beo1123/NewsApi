const router = require("express").Router();
const{ ensureAuthenticated } = require("../middleware/auth-Middleware");
const { 
    updateOne,
    getOne } = require("../Controller/ProfileController");

    const { validateRule, validate} = require("../validation/updateUserValidator");



router.put("/profile", ensureAuthenticated, validateRule(), validate,
    async(req,res) => {
        /*  #swagger.tags = ['Profile']
        #swagger.security = [{
        "Authorization": []
        }]
    	#swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: { $ref: "#/definitions/UpdateUserModel" }
    } */ 
        await updateOne(req,res);
});

router.get("/profile", ensureAuthenticated,  async(req,res) => {
       /*  #swagger.tags = ['Profile']
        #swagger.security = [{
        "Authorization": []
        }]
    */ 
    await getOne(req,res);
});




module.exports = router;
