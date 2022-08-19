const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => res.send("Hello GET"));

router
  .route("/:projectId(\\d+)")
  .get((req, res) => res.send("Hello GET SINGLE"));

router.route("/").post((req, res) => res.send("Hello POST1"));

router.route("/:projectId(\\d+)").put((req, res) => res.send("Hello PUT"));

router
  .route("/:projectId(\\d+)")
  .delete((req, res) => res.send("Hello DELETE"));

module.exports = router;
