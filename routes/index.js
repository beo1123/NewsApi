const router = require("express").Router();
const authRoute = require("./auth-routes");
const adminRoute = require("./admin-routes");
const categoryRoute = require("./category-routes");
const storyRoute = require("./story-routes");
const profileRoute = require("./profile-routes");
const commentRoute = require("./comment-routes");
const videoRoute = require("./video-routes");

router.use("/auth", authRoute);
router.use("/api", adminRoute);
router.use("/api", categoryRoute);
router.use("/api", storyRoute);
router.use("/api", profileRoute);
router.use("/api", commentRoute);
router.use("/api", videoRoute);

module.exports = router;