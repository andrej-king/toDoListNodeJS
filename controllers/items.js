const date = require('../generateDate.js');
const Task = require('../models/task');

exports.getMainPage = (req, res) => {
	Task.fetchTasks(items => {
		let day = date.getDate();
		res.render("index.ejs", {title: "TODO List", header: day, toDoItems: items});
	});
};

exports.getPostNewItem = (req, res) => {
	let newTask = req.body.newTask.trim();

	if (newTask !== '') {
		newTask = newTask.trim();
		const item = new Task(newTask);
		item.saveTask();
	}
	res.redirect("/");
};

exports.deleteItem = (req, res) => {
	Task.deleteItem(req.body.checkbox, 'regular');

	res.redirect("/");
}