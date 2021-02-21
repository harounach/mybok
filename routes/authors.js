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
  // Create an author object
  const author = new Author({
    name: req.body.name,
  });

  // Save the author to database
  author.save((err, newAuthor) => {
    if (err) {
      res.render("authors/new", {
        author: author,
        errorMessage: "Error creating author",
      });
    } else {
      //   res.redirect(`/authors/${newAuthor.id}`);
      res.redirect("/authors");
    }
  });
});

module.exports = router;
