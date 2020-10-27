let toDoList = [];
let workToDoList = [];
const fs   = require('fs');
const encoding  = 'utf8';

module.exports = class Task {
    constructor(task) {
        // this.description = task.description;
        // this.date = task.date;
        this.description = task;
    }

    saveTask() {
        toDoList.push(this);
    }

    saveWorkTask() {
    	workToDoList.push(this);
    }

    static fetchTasks() {
		return toDoList;
    }

    static fetchWorkTasks() {
    	return workToDoList;
    }

    static removeTask(taskID) {
		toDoList.splice(taskID, 1);
    }

    static removeWorkTask(taskID) {
		workToDoList.splice(taskID, 1);
    }

    static writeInFile(fileName, data) {
    	let status = false;
	    if (fs.existsSync(fileName)) {
		    fs.appendFileSync(fileName, "\n" + data, encoding);

		    // fs.appendFile(fileName, "\n" + data, encoding, (err) => {
			    // if (err) status = false;
		        // status = err;
		    // });
	    } else {
			fs.writeFileSync(fileName, data, encoding);
	    	//     fs.writeFile(fileName, data, encoding, (err) => {
		// 	    if (err) status = false;
		// 	    status = true;
		    	// if (err) {
			    // 	return err;
			    // } else {
				    // console.log('The file has been saved!');
			    // }
		    // })
	    }
	    // return status;
    }

    // static readFile(fileName) {
	//     if (fs.existsSync(fileName)) {
	// 	    fs.readFile(fileName, encoding, (err, data) => {
	// 		    if (err) return false;
	// 		    return data;
	// 	    });
	//     }
    // }
}