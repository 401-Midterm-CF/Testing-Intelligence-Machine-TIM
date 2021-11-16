'use strict';

//3rd Party Resources
const express = require('express');
const cors = require('cors');

//prepare express app
const app = express();

// Esoteric Resources
const quizHandler = require('./routes/quizAPI.js');

//app stuff
app.use(cors());
app.use(express.json());

//Routes
app.get('/quiz', quizHandler);

module.exports = {
	app,
	start: (port) => {
		app.listen(port, () => console.log(`listening on ${port}`));
	},
};
