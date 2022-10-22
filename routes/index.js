const path = require("path");
const router = require("express").Router();
const apiThought = require("./thought-routes");
const apiUser = require("./user-routes");

// API Routes
router.use("/api/thoughts", apiThought);
router.use("/api/users", apiUser);

router.use( ( req, res ) => {
  return res.send( 'Wrong route!' );
});

module.exports = router;