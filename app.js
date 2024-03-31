const express = require("express");
const path = require("path");
const issueRoutes = require("./routes/issues_routes");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use("/issues", issueRoutes);

// app.get("/", (req, res) => {
//     res.render("home", { issues });
// }); 

app.listen("3000", () => {
    console.log("Server is running and listening");
});