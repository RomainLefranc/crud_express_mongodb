const express = require("express");
const bodyParser = require("body-parser");
const coursRoute = require("./route/coursRoute");
const personneRoute = require("./route/personneRoute");
const personnes_coursRoute = require("./route/personnes_coursRoute");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/", coursRoute);
app.use("/", personneRoute);
app.use("/", personnes_coursRoute);

app.use(express.static("public"));

const mongoose = require("mongoose");

main().catch((e) => console.log(e));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Romain");
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
