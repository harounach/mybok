const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");
const indexRoute = require("./routes/index");

// server port
const PORT = 3000;

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// Set up routes
app.use("/", indexRoute);

// start listening to incoming request
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port: ${PORT} visit http:localhost:${PORT}`);
});
