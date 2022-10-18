const path = require("path");
const router = require("express").Router();
const apiThought = require("./thought-routes");
const apiUser = require("./user-routes");

// API Routes
router.use("/api/thought", apiThought);
router.use("/api/user", apiUser);


module.exports = router;