const memberModel = require('../model/memberSchema');

module.exports = {
	name: 'withdrawl',
	description:
		'TIM will withdrawlr a designated amount from your "valut" -> "Moneys".',
	async execute(message, args, memberData) {
		const amount = message.content.split(' ')[1];
		const updateMoneys = await memberModel.findOneAndUpdate(
			{
				userID: memberData.userID,
			},
			{
				$inc: {
					moneys: amount,
					vault: -amount,
				},
			}
		);
		const updatedMemberData = await memberModel.findOne({
			userID: memberData.userID,
		});
		return message.reply(
			`Ok. I have transfered $${amount} from your vault to your pocket. your current vault amount is now ${updatedMemberData.vault}`
		);
	},
};
