const memberModel = require('../model/memberSchema');

module.exports = {
	name: 'pls-sir',
	description:
		'TIM will take your ask for help and decide your worthiness. ex. call -> !pls-sir 500, will beg for 500 moneys. ',
	async execute(message, args, memberData) {
		// ----- Grabs reference to the requested amount ---- //
		const beg = message.content.split(' ')[1];
		// ----- Parses the '' into a Number ----- //
		const donation = Math.floor(Math.random() * `${beg}` + 1);
		// --- Sets a Beg Limit --- //
		if (beg > 5000) {
			message.reply(`Greedy Boy... You get nothing.`);
			return;
		} else {
			try {
				await memberModel.findOneAndUpdate(
					{
						userID: memberData.userID,
					},
					{
						$inc: {
							vault: donation,
						},
					}
				);
				message.reply(
					`${memberData.username} ask and you shall receive. ${donation} moneys baby!`
				);
				return;
			} catch (err) {
				console.log(err);
			}
		}
	},
};
