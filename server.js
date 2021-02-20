const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

// server port
const PORT = 3000;

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

// start listening to incoming request
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port: ${PORT} visit http:localhost:${PORT}`);
});
