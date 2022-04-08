const express = require("express");
const bodyParser = require("body-parser");
const coursRoute = require("./route/coursRoute");
const personneRoute = require("./route/personneRoute");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/", coursRoute);
app.use("/", personneRoute);

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
