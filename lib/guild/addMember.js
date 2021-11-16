const memberSchema = require('../model/memberSchema');

module.exports = async (member) => {
	let newMember = await memberSchema.create({
		userID: member.author.id,
		serverID: member.guildId,
		moneys: 1000,
		vault: 0,
	});
	profile.save();
};
