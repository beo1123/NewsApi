const router = require("express").Router();
const{ ensureAuthenticated, ensureAuthorized } = require("../middleware/auth-Middleware");
const { 
    addOne,
    removeOne, } = require("../Controller/CommentController");

    const { validateRule, validate} = require("../validation/conmmentValidator");



    router.post("/comments", ensureAuthenticated, validateRule(), validate, async (req, res) => {    
        /*  #swagger.tags = ['Posts']
            #swagger.security = [{
            "Authorization": []
            }]
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/CommentModel" }
        } */  
        await addOne(req, res);
    });
    
    
    router.delete("/comments/:id", ensureAuthenticated, async (req, res) => {    
        /*  #swagger.tags = ['Posts']
            #swagger.security = [{
            "Authorization": []
            }]
        */  
        await removeOne(req, res);
    });



module.exports = router;
