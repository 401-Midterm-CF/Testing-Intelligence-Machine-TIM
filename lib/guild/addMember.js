const memberSchema = require('../model/memberSchema');

module.exports = async (member) => {
	let newMember = await memberSchema.create({
		userID: member.id,
		serverID: member.guild.id,
		moneys: 1000,
		vault: 0,
	});
	profile.save();
};
