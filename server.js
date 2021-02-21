require("dotenv").config();
const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/index");
const authorRoutes = require("./routes/authors");
const bookRoutes = require("./routes/books");

const mongoose = require("mongoose");

// server port
const PORT = 3000;

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Apply middlewares
app.use(express.urlencoded({ limit: "10mb", extended: false }));

// Connect to database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// Set up routes
app.use("/", indexRoute);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);

// start listening to incoming request
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server listening on port: ${PORT} visit http://localhost:${PORT}`
  );
});
