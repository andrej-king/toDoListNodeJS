const date = require('../generateDate.js');
const Task = require('../models/taskFromFile');

exports.getMainPage = (req, res) => {
	Task.fetchWorkTasks(workItems => {
		let day = date.getDate();
		res.render("work.ejs", {title: "Work List", header: day, toDoItems: workItems});
	});
};

exports.getPostNewItem = (req, res) => {
	let newWorkTask = req.body.newWorkTask.trim();

	if (newWorkTask !== '') {
		newWorkTask = newWorkTask.trim();
		const item = new Task(newWorkTask);
		item.saveWorkTask();
	}
	res.redirect("/work");
};

exports.deleteItem = (req, res) => {
	Task.deleteItem(req.body.checkbox, 'work');

	res.redirect("/work");
}