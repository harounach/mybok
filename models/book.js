const mongoose = require("mongoose");
const path = require("path");

const coverImageBasePath = "uploads/bookCovers";

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

// add coverImagePath virtual property to display image in books page
BookSchema.virtual("coverImagePath").get(function () {
  if (this.coverImageName != null) {
    return path.join("/", coverImageBasePath, this.coverImageName);
  }
});

module.exports = mongoose.model("Book", BookSchema);

module.exports.coverImageBasePath = coverImageBasePath;
