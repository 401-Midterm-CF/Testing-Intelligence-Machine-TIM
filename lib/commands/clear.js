const memberModel = require('../model/memberSchema');

module.exports = {
	name: 'clear',
	description: 'This is an admin command to clear yuour current money value',
	async execute(message, args, memberData) {
		// --- Determines if you are going to clear moneys || vault --- //
		const condition = message.content.split(' ')[1];
		let moneys = memberData.moneys;
		let vault = memberData.vault;

		// ---- Logic to clear ---- //
		if (!condition) {
			message.reply(
				`Please specify which account you would like to clear: !clear moneys or !clear vault`
			);
			return;
		}
		if (condition === 'moneys') {
			try {
				await memberModel.findOneAndUpdate(
					{
						userID: memberData.userID,
					},
					{
						$inc: {
							moneys: -moneys,
						},
					}
				);
				message.reply(`Your Wallet has been emptied.`);
				// return;
			} catch (err) {
				console.log(err);
			}
		}
		if (condition === 'vault') {
			try {
				await memberModel.findOneAndUpdate(
					{
						userID: memberData.userID,
					},
					{
						$inc: {
							vault: -vault,
						},
					}
				);
				message.reply(`Your Vault has been emptied.`);
				// return;
			} catch (err) {
				console.log(err);
			}
		}
		// ----- Return to Sender if failed command ----- //
		message.reply(`${memberData.username} Have Nice Day!`);
	},
};
