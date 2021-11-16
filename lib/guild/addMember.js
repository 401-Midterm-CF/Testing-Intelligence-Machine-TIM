const memberSchema = require('../model/memberSchema');

module.exports = async (client, discord, member) => {
	let member = await memberSchema.create({
		userID: member.id,
		serverID: member.guild.id,
		moneys: 1000,
		vault: 0,
	});
	profile.save();
};
