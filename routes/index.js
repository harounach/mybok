const { Router } = require("express");
const router = Router();
const Book = require("../models/book");

// index page route
router.route("/").get(async (req, res) => {
  let books;
  try {
    books = await Book.find().sort({ createdAt: "desc" }).limit(10).exec();
  } catch {
    books = [];
  }
  res.render("index", { books: books });
});

module.exports = router;
