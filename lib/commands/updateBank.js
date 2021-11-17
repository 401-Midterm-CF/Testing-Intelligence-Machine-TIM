'use strict';

const memberModel = require('../model/memberSchema.js');

const addToBank = async (difficulty, memberData) => {
	let diff;
	console.log(difficulty);
	console.log(memberData);
	if (difficulty === 'easy') {
		diff = 100;
	} else if (difficulty === 'medium') {
		diff = 300;
	} else if (difficulty === 'hard') {
		diff = 500;
	}
	console.log(diff);
	let userBank = await memberModel.findOneAndUpdate(
		{
			userID: memberData,
		},
		{
			$inc: {
				vault: diff,
			},
		}
	);
	console.log(userBank);
	return userBank;
};

const decreaseFromBank = async (difficulty, memberData) => {
	let diff;
	console.log(difficulty);
	console.log(memberData);
	if (difficulty === 'easy') {
		diff = 100;
	} else if (difficulty === 'medium') {
		diff = 300;
	} else if (difficulty === 'hard') {
		diff = 500;
	}
	console.log(diff);
	let userBank = await memberModel.findOneAndUpdate(
		{
			userID: memberData,
		},
		{
			$inc: {
				vault: -diff,
			},
		}
	);
	console.log(userBank);
	return userBank;
};

module.exports = {
	addToBank,
	decreaseFromBank,
};
