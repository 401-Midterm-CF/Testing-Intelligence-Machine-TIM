'use strict';
const memberModel = require('../model/memberSchema.js');

const win = async (wager, memberData) => {
	let userBank = await memberModel.findOneAndUpdate(
		{
			userID: memberData.userID,
		},
		{
			$inc: {
				moneys: wager * 2,
			},
		}
	);
	return userBank;
};

const lose = async (wager, memberData) => {
	let userBank = await memberModel.findOneAndUpdate(
		{
			userID: memberData.userID,
		},
		{
			$inc: {
				moneys: -(wager * 2),
			},
		}
	);
	return userBank;
};

module.exports = {
	win,
	lose,
};
