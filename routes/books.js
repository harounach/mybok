const { Router } = require("express");
const router = Router();

const Book = require("../models/book");
const Author = require("../models/author");

// All books route
router.route("/").get(async (req, res) => {
  res.send("All Books");
});

// New books route
router.route("/new").get(async (req, res) => {
  try {
    const authors = await Author.find({});
    const book = new Book();
    res.render("books/new", {
      authors: authors,
      book: book,
    });
  } catch (err) {
    console.error(err);
    res.redirect("/books");
  }
});

// Create book route
router.route("/").post(async (req, res) => {
  res.send("Create Book");
});

module.exports = router;
