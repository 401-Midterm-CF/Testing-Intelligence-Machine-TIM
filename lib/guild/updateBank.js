'use strict';

const memberModel = require('../model/memberSchema.js');

const addToBank = async (difficulty, memberData) => {
	let diff;
	if (difficulty === 'easy') {
		diff = 100;
	} else if (difficulty === 'medium') {
		diff = 500;
	} else if (difficulty === 'hard') {
		diff = 1000;
	}
	let userBank = await memberModel.findOneAndUpdate(
		{
			userID: memberData.userID,
		},
		{
			$inc: {
				moneys: diff,
			},
		}
	);
	return userBank;
};

const decreaseFromBank = async (difficulty, memberData) => {
	let diff;
	if (difficulty === 'easy') {
		diff = 100;
	} else if (difficulty === 'medium') {
		diff = 500;
	} else if (difficulty === 'hard') {
		diff = 1000;
	}
	// --- Prevents Vault balance to go Negative ---- //
	if (memberData.moneys - diff <= 0) {
		diff = memberData.moneys;
	}
	let userBank = await memberModel.findOneAndUpdate(
		{
			userID: memberData.userID,
		},
		{
			$inc: {
				moneys: -diff,
			},
		}
	);
	return userBank;
};

module.exports = {
	addToBank,
	decreaseFromBank,
};
