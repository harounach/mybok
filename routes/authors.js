const { Router } = require("express");
const router = Router();

const Author = require("../models/author");

// All authors route
router.route("/").get((req, res) => {
  res.render("authors/index");
});

// New authors route
router.route("/new").get((req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create authors route
router.route("/").post((req, res) => {
  res.send("Author created");
});

module.exports = router;
