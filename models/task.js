let toDoList = [];
let workToDoList = [];

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
}