const date      = require('../generateDate.js');
const mongoose  = require('mongoose');
// const Task    = require('../models/taskFromFile'); // for work with file

const Task      = mongoose.model('Task');

// read / write in mongo db
 exports.getMainPage = (req, res) => {
	 let day = date.getDate();
	 Task.find((error, tasks) => {
	 	if (!error) {
		    res.render("index.ejs", {title: "ToDo List", header: day, toDoItems: tasks});
	    } else {
		    console.log("Failer to retireve data: ", error);
	    }
	 });
};

exports.postNewItem = (req, res) => {
	let item = req.body.newTask.trim();

	if (item !== '') {
		let newTask = new Task();
		newTask.description = item;

		newTask.save((error, response) => {
			if (!error) {
				res.redirect("/");
			} else {
				console.log("Save task error msg: ", error);
			}
		});
	}
};

exports.deleteItem = (req, res) => {
	// Task.deleteItem(req.body.checkbox, 'regular');

	const checkItemId = req.body.checkbox;
	Task.findByIdAndRemove(checkItemId, function (error) {
		if (!error) {
			console.log("Successfully delete item: ", checkItemId);
			res.redirect("/");
		} else {
			console.log("Delete error msg: ", error);
		}
	});
}

// read / write in file
/* exports.getMainPage = (req, res) => {
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
}*/