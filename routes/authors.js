const { Router } = require("express");
const router = Router();

// All authors route
router.route("/").get((req, res) => {
  res.render("authors/index");
});

// New authors route
router.route("/new").get((req, res) => {
  res.render("authors/new");
});

// Create authors route
router.route("/new").post((req, res) => {
  res.send("Author created");
});

module.exports = router;
