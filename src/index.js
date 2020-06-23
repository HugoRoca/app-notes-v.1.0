const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override")
const session = require("express-session")
const app = express();

// TODO Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// TODO Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// TODO Global variables

// TODO Routes

// TODO Static files

// TODO Server is listening
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
