const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const issueRoutes = require("./routes/issues_routes");
const mongoose = require("mongoose");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/issues", issueRoutes);

// app.get("/", (req, res) => {
//     res.render("home", { issues });
// }); 

app.listen("3000", () => {
    console.log("Server is running and listening");
});