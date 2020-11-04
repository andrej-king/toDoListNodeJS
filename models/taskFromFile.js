const encoding              = 'utf8';
const fs                    = require('fs');
const path                  = require('path');
const folderWithData        = 'data';
const regularTaskFile       = 'regularTasks.json';
const workTaskFile          = 'workTasks.json';
const pathToRegularTaskFile = path.join(path.dirname(require.main.filename), folderWithData, regularTaskFile);
const pathToWorkTaskFile    = path.join(path.dirname(require.main.filename), folderWithData, workTaskFile);

module.exports = class Task {
    constructor(task) {
        this.description = task;
    }

    saveTask() {
    	if (fs.existsSync(pathToRegularTaskFile)) {
		    fs.readFile(pathToRegularTaskFile, encoding, (error, fileContent) => {
			    let tasks = [];

			    if (!error) {
				    tasks = JSON.parse(fileContent);
			    } else {
				    console.log(error);
			    }

			    tasks.push(this);

			    fs.writeFile(pathToRegularTaskFile, JSON.stringify(tasks), encoding, (error) => {
				    console.log('Error', error);
			    });
		    });
	    } else {
		    console.log('saveTask: file ' + regularTaskFile + ' not exist');
	    }
    }

    saveWorkTask() {
    	if (fs.existsSync(pathToWorkTaskFile)) {
		    fs.readFile(pathToWorkTaskFile, encoding, (err, fileContent) => {
			    let workTasks = [];

			    if (!err) {
				    workTasks = JSON.parse(fileContent);
			    } else {
				    console.log(err);
			    }

			    workTasks.push(this);

			    fs.writeFile(pathToWorkTaskFile, JSON.stringify(workTasks), encoding, (err) => {
				    console.log(err);
			    })
		    });
	    } else {
		    console.log('saveWorkTask: file ' + pathToWorkTaskFile + ' not exist');
	    }
    }

    static fetchTasks(callBack) {
    	if (fs.existsSync(pathToRegularTaskFile)) {
		    fs.readFile(pathToRegularTaskFile, encoding, (error, fileContent) => {
			    if (error) {
				    callBack([]);
			    }

			    callBack(JSON.parse(fileContent));
		    });
		    return callBack;
	    } else {
    		this.createNewFileJson(pathToRegularTaskFile, '[]');
		    // console.log('fetchTasks: file ' + pathToWorkTaskFile + ' not exist');
	    }
    }

    static fetchWorkTasks(callBack) {
    	if (fs.existsSync(pathToWorkTaskFile)) {
		    fs.readFile(pathToWorkTaskFile, encoding, (err, fileContent) => {
			    if (err) {
				    callBack([]);
			    }

			    callBack(JSON.parse(fileContent));
		    });
		    return callBack;
	    } else {
		    this.createNewFileJson(pathToWorkTaskFile, '[]');
		    console.log('fetchWorkTasks: file ' + pathToWorkTaskFile + ' not exist');
	    }
    }

    static deleteItem(description, taskType) {
    	let filePath = pathToRegularTaskFile;
    	if (taskType === 'regular') {
		    filePath = pathToRegularTaskFile
	    } else if (taskType === 'work') {
			filePath = pathToWorkTaskFile;
	    }


	    if (fs.existsSync(filePath)) {
		    fs.readFile(filePath, encoding, (error, fileContent) => {
			    let tasks = [];
			    if (!error) {
				    tasks = JSON.parse(fileContent);
			    }

			    for (let i = 0; i < tasks.length; i++) {
				    if (tasks[i].description === description) {
					    console.log(tasks[i].description, " deleted");
					    tasks.splice(i, 1);
					    break;
				    }
			    }

			    fs.writeFile(filePath, JSON.stringify(tasks), (error) => {
				    console.log("Attempt to write deleted item failed: " + error);
			    })
		    });
	    } else {
	        console.log('deleteItem: file ' + filePath + ' not exist');
	    }
    }

    static createNewFileJson(pathAndName, data) {
		fs.writeFileSync(pathAndName, data, encoding);
    }
}