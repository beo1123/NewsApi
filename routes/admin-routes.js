const router = require("express").Router();
const{ ensureAuthenticated, ensureAuthorized } = require("../middleware/auth-Middleware");
const { register } = require("../Controller/authController");

const { getAll, getOne } = require("../Controller/adminController");

router.get("/users", ensureAuthenticated, 
    ensureAuthorized(["admin"], async(req,res) => {
    /*
        #swagger.tags = ['Admin']
        #swagger.security = [{
            "Authorization": []
        }]
    */
        await getAll(req,res);
}));

router.get("/users/:id", ensureAuthenticated, 
    ensureAuthorized(["admin"], async(req,res) => {
    /*
        #swagger.tags = ['Admin']
        #swagger.security = [{
            "Authorization": []
        }]
    */
        await getOne(req,res);
}));

router.post("/seed", async(req,res) => {
     //#swagger.tags = ['Admin'] 
        const admin ={
            name: "Administrator",
            email: "vbao964@gmail.com",
            password: "quocbao1123",

        };
        await register(admin, "admin", res);
});

module.exports = router;
