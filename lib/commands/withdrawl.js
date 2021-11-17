const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const memberModel = require('../model/memberSchema');
module.exports = {
	name: 'withdrawal',
	description:
		'TIM will withdrawal a designated amount from your "valut" -> "Moneys".',
	async execute(message, args, memberData) {
		// ------ Check for Insufficient Funds ----- //
		const amount = message.content.split(' ')[1];

		const failedWithdrawalEmbed = new MessageEmbed()
			.setColor('#ffff00')
			.setTitle(`${memberData.username}'s Bank Statement`)
			.setDescription('Failed Transfer: Insufficient Funds')
			.addFields(
				{ name: `Wallet`, value: `$${memberData.moneys}`, inline: true },
				{ name: `Vault`, value: `$${memberData.vault}`, inline: true }
			);

		if (memberData.vault - amount <= 0) {
			return message.reply({
				embeds: [failedWithdrawalEmbed],
			});
		}
		// ------------------------------------------------ Sufficient Funds: Successful Transfer Request -------------------- //

		// ----- Update DB ------- //
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

		// ---- Grab Reference to updated memberData ---- //
		const updatedMemberData = await memberModel.findOne({
			userID: memberData.userID,
		});

		// ---- TIMS Response ---- //
		const withdrawalEmbed = new MessageEmbed()
			.setColor('#ffff00')
			.setTitle(`${memberData.username}'s Transfer Statement`)
			.setDescription('Transfer Status: Success')
			.addFields(
				{
					name: `Current Vault Balance`,
					value: `$${updatedMemberData.vault}`,
					inline: true,
				},
				{
					name: `Previous Vault Balance`,
					value: `$${memberData.vault}`,
					inline: true,
				}
			);

		// --- Return to Sender --- //
		return message.reply({
			embeds: [withdrawalEmbed],
		});
	},
};
