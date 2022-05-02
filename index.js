const express = require("express");
const coursRoute = require("./route/coursRoute");
const personneRoute = require("./route/personneRoute");
const personnes_coursRoute = require("./route/personnes_coursRoute");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Romain");
}

main().catch((e) => console.log(e));
app.disable("x-powered-by");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use("/", coursRoute);
app.use("/", personneRoute);
app.use("/", personnes_coursRoute);
app.use(express.static("public"));

app.listen(3000);
