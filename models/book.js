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
    coverImage: {
      type: Buffer,
      required: true,
    },
    coverImageType: {
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
  if (this.coverImage != null && this.coverImageType != null) {
    return `data:${
      this.coverImageType
    };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
  }
});

module.exports = mongoose.model("Book", BookSchema);
