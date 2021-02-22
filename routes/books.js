const { Router } = require("express");
const router = Router();

const Book = require("../models/book");
const Author = require("../models/author");

const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// All books route
router.route("/").get(async (req, res) => {
  // Build the search query
  let query = Book.find();
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if (req.query.publishedBefore != null && req.query.publishedBefore != "") {
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != "") {
    query = query.gte("publishDate", req.query.publishedAfter);
  }

  try {
    // Get books from database
    const books = await query.exec();
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
  } catch (err) {
    res.redirect("/");
  }
});

// New books route
router.route("/new").get(async (req, res) => {
  const book = new Book();
  renderNewPage(res, book);
});

// Create book route
router.route("/").post(async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
  });

  // save book cover
  saveCover(book, req.body.cover);

  // Save the book to the database
  try {
    const newBook = await book.save();
    // res.redirect(`/books/${newBook.id}`);
    res.redirect("/books");
  } catch (err) {
    console.error(err);
    renderNewPage(res, book, true);
  }
});

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({});

    const params = {
      authors: authors,
      book: book,
    };

    if (hasError) {
      params.errorMessage = "Error creating book";
    }

    res.render("books/new", params);
  } catch (err) {
    console.error(err);
    res.redirect("/books");
  }
}

// save book cover
function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;
  }
}

module.exports = router;
