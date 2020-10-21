const date = require('../generateDate.js');
const Task = require('../models/task');

exports.getMainPage = (req, res) => {
    let day = date.getDate();
    const itemsList = Task.fetchTasks();
    res.render("index.ejs", {title: "TODO List", header: day, toDoItems: itemsList});
};

exports.getPostNewItem = (req, res) => {
    let newTask = req.body.newTask.trim();
    if (newTask !== '') {
	    const item = new Task(newTask);
	    item.saveTask();
    }
    res.redirect("/");
};