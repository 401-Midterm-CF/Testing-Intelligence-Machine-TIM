const memberModel = require('../model/memberSchema');

module.exports = {
	name: 'pls-sir',
	description: 'TIM will take your ask for help and decide your worthyness.',
	async execute(message, args, memberData) {
		const beg = message.content.split(' ')[1];
		const donation = Math.floor(Math.random() * `${beg}` + 1);
		const updateVault = await memberModel.findOneAndUpdate(
			{
				userID: memberData.userID,
			},
			{
				$inc: {
					vault: donation,
				},
			}
		);
		return message.reply(
			`${memberData.username} ask and you shall receive. ${donation} moneys baby!`
		);
	},
};
