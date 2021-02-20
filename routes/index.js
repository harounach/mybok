const { Router } = require("express");
const router = Router();

// index page route
router.route("/").get((req, res) => {
  res.send("Hello, world!");
});

module.exports = router;
