const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const issueRoutes = require("./routes/issues_routes");
const userRoutes = require("./routes/users_routes");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");

const secret = "this is my biggest secret";
const sessionConfiguration = {
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

mongoose
  .connect("mongodb://127.0.0.1:27017/issues")
  .catch((error) => console.log(error));

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected");
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session(sessionConfiguration));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/issues", issueRoutes);
app.use("/users", userRoutes);
app.use(express.static("public"));
app.all("*", (req, res, next) => {
  const error = new ExpressError(404, "Not known path")
  next(error);
});

app.use((error, req, res, next) => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  if (!error.message) {
    error.message = "Something went wrong on the server";
  }
  res.status(error.statusCode).render("error", { error });
});

app.listen("3000", () => {
    console.log("Server is running and listening");
});