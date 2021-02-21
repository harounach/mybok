const { Router } = require("express");
const router = Router();

const Author = require("../models/author");

// All authors route
router.route("/").get(async (req, res) => {
  const searchOptions = {};

  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }

  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (error) {
    res.redirect("/");
  }
});

// New authors route
router.route("/new").get((req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create authors route
router.route("/").post(async (req, res) => {
  // Create an author object
  const author = new Author({
    name: req.body.name,
  });

  // Save the author to database
  try {
    const newAuhtor = await author.save();
    //   res.redirect(`/authors/${newAuthor.id}`);
    res.redirect("/authors");
  } catch (err) {
    console.error(err);
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

module.exports = router;
