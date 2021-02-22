const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Book = require("../models/book");
const Author = require("../models/author");

const uploadPath = path.join("public", Book.coverImageBasePath);

const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// Set up multer for book cover image
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype));
  },
});

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
router
  .route("/")
  .post(
    /* file upload middleware */ upload.single("cover"),
    async (req, res) => {
      const fileName = req.file != null ? req.file.filename : null;

      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description,
      });

      // Save the book to the database
      try {
        const newBook = await book.save();
        // res.redirect(`/books/${newBook.id}`);
        res.redirect("/books");
      } catch (err) {
        console.error(err);
        if (book.coverImageName != null) {
          removeBookCover(book.coverImageName);
        }
        renderNewPage(res, book, true);
      }
    }
  );

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), (err) => {
    console.error(err);
  });
}

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

module.exports = router;
