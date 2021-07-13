const express = require("express");
const newsRouter = require("./src/routes/news");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/js", express.static(__dirname + "public/js"));

// Templating engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", newsRouter);
app.use("/article", newsRouter);

// Listen on Port 5000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
