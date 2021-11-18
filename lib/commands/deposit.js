const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const memberModel = require('../model/memberSchema');
module.exports = {
	name: 'deposit',
	description:
		'TIM will deposit a designated amount from your "Moneys" -> "Vault".',
	async execute(message, args, memberData) {
		// ------ Check for Insufficient Funds ----- //
		const amount = message.content.split(' ')[1];

		const failedDepositEmbed = new MessageEmbed()
			.setColor('#ffff00')
			.setTitle(`${memberData.username}'s Deposit Rejected`)
			.setDescription(`Crickey! You don't have any quid in your pocket`)
			.addFields(
				{ name: `Wallet`, value: `$${memberData.moneys}`, inline: true },
				{ name: `Vault`, value: `$${memberData.vault}`, inline: true }
			);

		if (memberData.moneys - amount < 0) {
			return message.reply({
				embeds: [failedDepositEmbed],
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
					moneys: -amount,
					vault: amount,
				},
			}
		);

		// ---- Grab Reference to updated memberData ---- //
		const updatedMemberData = await memberModel.findOne({
			userID: memberData.userID,
		});

		// ---- TIMS Response ---- //
		const depositEmbed = new MessageEmbed()
			.setColor('#ffff00')
			.setTitle(`${memberData.username}'s Deposit Slip`)
			.setDescription('Deposit: Completed')
			.addFields(
        {
          name: `Previous Vault Balance`,
          value: `$${memberData.vault}`,
          inline: true,
        },
				{
					name: `Current Vault Balance`,
					value: `$${updatedMemberData.vault}`,
					inline: true,
				}
			);

		// --- Return to Sender --- //
		return message.reply({
			embeds: [depositEmbed],
		});
	},
};
