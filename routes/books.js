const { Router } = require("express");
const router = Router();

const Book = require("../models/book");

// All books route
router.route("/").get(async (req, res) => {
  res.send("All Books");
});

// New books route
router.route("/new").get((req, res) => {
  res.send("New Book");
});

// Create book route
router.route("/").post(async (req, res) => {
  res.send("Create Book");
});

module.exports = router;
