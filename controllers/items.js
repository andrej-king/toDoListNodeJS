const date = require('../generateDate.js');
const Task = require('../models/task');
const fileTasks = 'tasks.txt';
const fs   = require('fs');
const encoding  = 'utf8';

exports.getMainPage = (req, res) => {
    let day = date.getDate();
    const itemsList = Task.fetchTasks();
    res.render("index.ejs", {title: "TODO List", header: day, toDoItems: itemsList});
};

exports.getPostNewItem = (req, res) => {
    let newTask = req.body.newTask;
	let removeTask = req.body.removeTask;

	if (removeTask >= 0) {
		Task.removeTask(removeTask);

		// save change
		const itemsList = Task.fetchTasks();
		fs.unlinkSync(fileTasks); // delete file
		for(var i = 0; i < itemsList.length; i++) {
			Task.writeInFile(fileTasks, itemsList[i].description);
		}
	} else if (newTask.trim() !== '') {
		newTask = newTask.trim();
	    const item = new Task(newTask);
	    item.saveTask();

	    // write task in file
		Task.writeInFile(fileTasks, newTask);

		// read from file in console
		if (fs.existsSync(fileTasks)) {
			console.log(fs.readFileSync(fileTasks, encoding));
		}
	}

	res.redirect("/");

	// if (fs.existsSync(fileTasks)) {
	// 	fs.appendFileSync(fileTasks, "\n" + newTask, encoding);
	//
	// 	// console.log(fs.readFileSync(fileTasks, encoding));
	//
	// 	fs.readFile(fileTasks, encoding, (err, data) => {
	// 		if (err) throw err;
	// 		console.log(data);
	// 	});
	// } else {
	// 	fs.writeFile(fileTasks, newTask, encoding, (err) => {
	// 		if (err) throw err;
	// 		console.log('The file has been saved!');
	// 	})
	// }
};