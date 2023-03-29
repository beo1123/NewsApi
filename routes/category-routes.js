const router = require("express").Router();
const{ ensureAuthenticated, ensureAuthorized } = require("../middleware/auth-Middleware");
const { validateRule, validate} = require("../validation/categoryValidator");
const { 
    addOne,
    removeOne,
    updateOne,
    getAll,
    getOne } = require("../Controller/categoryController");


    router.get("/categories", async (req, res) => {  
        // #swagger.tags = ['Posts']
              
        await getAll(req, res);
    });
    
    router.post("/categories", ensureAuthenticated, ensureAuthorized(["admin"]), validateRule(), validate, async (req, res) => {    
        /*  #swagger.tags = ['Posts']
            #swagger.security = [{
            "Authorization": []
            }]
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/CategoryModel" }
        } */  
        try {
            const category = await addOne(req, res);
            res.send(category);
            console.log(category);
          } catch (err) {
            console.log(err);
          }
        
    });
    
    router.put("/categories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), validateRule(), validate, async (req, res) => {    
        /*  #swagger.tags = ['Posts']
            #swagger.security = [{
            "Authorization": []
            }]
            #swagger.parameters['obj'] = {
                in: 'body',
                required: true,
                schema: { $ref: "#/definitions/CategoryModel" }
        } */  
        await updateOne(req, res);
    });
    
    router.get("/categories/:id", async (req, res) => {  
        // #swagger.tags = ['Posts']  
        await getOne(req, res);
    });
    
    router.delete("/categories/:id", ensureAuthenticated, ensureAuthorized(["admin"]), async (req, res) => {    
        /*  #swagger.tags = ['Posts']
            #swagger.security = [{
            "Authorization": []
            }]
        */  
        await removeOne(req, res);
    });
    
    module.exports = router;