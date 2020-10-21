const date = require('../generateDate.js');
const Task = require('../models/task');

exports.getMainPage = (req, res) => {
    let day = date.getDate();
    const itemsList = Task.fetchWorkTasks();
    res.render("work.ejs", {title: "Work List", header: day, toDoItems: itemsList});
};

exports.getPostNewItem = (req, res) => {
    let newTask = req.body.newTask.trim();
    if (newTask !== '') {
        const item = new Task(newTask);
        item.saveWorkTask();
    }
    res.redirect("/work");
};