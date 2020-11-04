const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/toDoListDB', {useNewUrlParser: true, useUnifiedTopology: true});
require('./task');

