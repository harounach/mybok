const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    // Schema definition
    name: {
      type: String,
      required: true,
    },
  },

  // options
  {
    collection: "mybok_authors",
  }
);

module.exports = mongoose.model("Author", AuthorSchema);
