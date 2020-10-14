const express       = require("express");
const bodyParser    = require("body-parser");
const ejs           = require("ejs");
const app           = express();
const PORT          = process.env.PORT || 3000;
const date          = require(__dirname + "/generateDate.js");

app.set("view engine", ejs);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let toDoList = [];

app.get("/", (req, res) => {
    let day = date.getDate();
    // let weekDay = date.getWeekDay();
    res.render("index.ejs", {title: "TODO List", header: day, toDoItems: toDoList});
});

app.get("/about", (req, res) => {
	let day = date.getDate();
	res.render("about.ejs", {title: "About", header: "About page", toDoItems: toDoList});
});

app.post("/", (req, res) => {
    let newTask = req.body.newTask.trim();
    if (newTask !== '') {
        toDoList.push(newTask);
    }
    res.redirect("/");
    console.log(toDoList);
});

app.listen(PORT, () => {
    console.log(`${PORT} is running`);
});