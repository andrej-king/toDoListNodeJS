const date      = require('../generateDate.js');
const mongoose  = require('mongoose');
const WorkTask  = mongoose.model('WorkTask');

exports.getMainPage = (req, res) => {
	let day = date.getDate();
	WorkTask.find((error, workTasks) => {
		if (!error) {
			res.render("work.ejs", {title: "Work List", header: day, toDoItems: workTasks});
		} else {
			console.log("Failed to retireve data: ", error);
		}
	});
};

exports.postNewItem = (req, res) => {
	let workItem = req.body.newWorkTask.trim();

	if (workItem !== '') {
		let newWorkTask = new WorkTask();
		newWorkTask.description = workItem;

		newWorkTask.save((error, response) => {
			if (!error) {
				res.redirect("/work");
			} else {
				console.log("Save task error msg: ", error);
			}
		});
	}
};

exports.deleteItem = (req, res) => {
	const checkItemId = req.body.checkbox;
	WorkTask.findByIdAndRemove(checkItemId, function (error) {
		if (!error) {
			console.log("Successfully delete item: ", checkItemId);
			res.redirect("/work");
		} else {
			console.log("Delete error msg: ", error);
		}
	});
}