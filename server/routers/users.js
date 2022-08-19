const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => res.send("Hello GET USERS"));

router
  .route("/:userId(\\d+)")
  .get((req, res) => res.send("Hello GET SINGLE USER"));

router.route("/").post((req, res) => res.send("Hello POST USER"));

router.route("/:userId(\\d+)").put((req, res) => res.send("Hello PUT USER"));

router
  .route("/:userId(\\d+)")
  .delete((req, res) => res.send("Hello DELETE USER"));

module.exports = router;
