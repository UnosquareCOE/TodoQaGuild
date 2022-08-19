const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => res.send("Hello GET TODOS"));

router
  .route("/:todoId(\\d+)")
  .get((req, res) => res.send("Hello GET SINGLE TODO"));

router.route("/").post((req, res) => res.send("Hello POST TODO"));

router.route("/:todoId(\\d+)").put((req, res) => res.send("Hello PUT TODO"));

router
  .route("/:todoId(\\d+)")
  .delete((req, res) => res.send("Hello DELETE TODO"));

module.exports = router;
