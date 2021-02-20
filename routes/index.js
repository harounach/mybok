const { Router } = require("express");
const router = Router();

// index page route
router.route("/").get((req, res) => {
  res.render("index");
});

module.exports = router;
