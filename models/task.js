const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
	description: {
		type: String
	}
});

const Task = mongoose.model('Task', taskSchema, 'tasks');
// Task.createCollection().then(function(collection) {
// 	console.log('Collection is created!');
// });

const workTaskSchema = new Schema({
	description: {
		type: String
	}
});

const WorkTask = mongoose.model('WorkTask', workTaskSchema, 'workTasks');
// WorkTask.createCollection().then(function(collection) {
// 	console.log('Collection is created!');
// });