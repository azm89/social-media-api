const router = require("express").Router();
const thoughtController = require("../controllers/thoughts-controller.js");

//"/api/thoughts"
router.route("/")
  .post(thoughtController.create);


router.route("/")
  .get(thoughtController.findAll);

router.route("/:id")
  .get(thoughtController.findById);


router.route("/:id")
  .put(thoughtController.updateThought);

router.route("/:thoughtId/reactions")
  .put(thoughtController.addReaction);

router.route("/:thoughtId/reactions")
  .put(thoughtController.removeReaction);


router.route("/:id")
  .delete(thoughtController.deleteThought);


module.exports = router;