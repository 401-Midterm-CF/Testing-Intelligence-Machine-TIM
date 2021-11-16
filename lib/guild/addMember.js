const memberSchema = require('../model/memberSchema');

module.exports = async (message) => {
	let newMember = await memberSchema.create({
		userID: message.author.id,
		userName: message.author.username,
		serverID: message.guildId,
		moneys: 1000,
		vault: 0,
	});
	profile.save();
};

// swap this function out for our hard coded function in bot.js to clean it up and refactor.
