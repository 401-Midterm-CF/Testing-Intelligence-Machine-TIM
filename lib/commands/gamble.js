// const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

// module.exports = {
// 	name: 'gamble',
// 	description: 'Do you feel Lucky?',
// 	execute(message, args, memberData) {
// 		const newEmbed = new MessageEmbed()
// 			.setColor('#ffff00')
// 			.setTitle(`${memberData.username} wishes to Gamble`)
// 			.addFields(
// 				{ name: ``, value: `$${memberData.moneys}`, inline: true },
// 				{ name: `Vault`, value: `$${memberData.vault}`, inline: true }
// 			);
// 		message.reply({
// 			embeds: [newEmbed],
// 		});
// 	},
// };