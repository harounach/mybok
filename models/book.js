const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    // Schema definition
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    createdAT: {
      type: Date,
      required: true,
      default: Date.now,
    },
    coverImageName: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
  },

  // options
  {
    collection: "mybok_books",
  }
);

module.exports = mongoose.model("Book", BookSchema);
