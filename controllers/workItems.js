const date = require('../generateDate.js');
const Task = require('../models/task');
const fileWorkTasks = 'workTasks.txt';
const fs   = require('fs');
const encoding  = 'utf8';

exports.getMainPage = (req, res) => {
    let day = date.getDate();

    // get tasks from file
	if(Task.fetchWorkTasks().length === 0) {
		if (fs.existsSync(fileWorkTasks)) {
			var array = fs.readFileSync(fileWorkTasks, encoding).toString().split("\n");
			for (i in array) {
				// console.log(array[i]);
				const item = new Task(array[i]);
				item.saveWorkTask();
			}
		}
	}
	const workItemsList = Task.fetchWorkTasks();
	res.render("work.ejs", {title: "Work List", header: day, toDoItems: workItemsList});
};

exports.getPostNewItem = (req, res) => {
    let newTask = req.body.newTask;
    let removeWorkTask = req.body.removeWorkTask;

	if (removeWorkTask >= 0) {
		Task.removeWorkTask(removeWorkTask);

		// save change
		const workItemsList = Task.fetchWorkTasks();
		fs.unlinkSync(fileWorkTasks); // delete file
		for(var i = 0; i < workItemsList.length; i++) {
			Task.writeInFile(fileWorkTasks, workItemsList[i].description);
		}
	} else if (newTask.trim() !== '') {
		newTask = newTask.trim();
		const item = new Task(newTask);
        item.saveWorkTask();

		// write task in file
		Task.writeInFile(fileWorkTasks, newTask);

		// read from file in console
		if (fs.existsSync(fileWorkTasks)) {
			console.log(fs.readFileSync(fileWorkTasks, encoding));
		}
    }
    res.redirect("/work");
};