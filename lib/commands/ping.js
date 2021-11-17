const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'I play better ping-pong than forrest Gump!',
	execute(message, args) {
		const newEmbed = new MessageEmbed()
			.setColor('#ffff00')
			.setTitle('Pong')
			.setDescription('You say Ping!, I say Pong!');

		const ping = new MessageActionRow().addComponents(
			new MessageButton()
				.setStyle('PRIMARY')
				.setLabel('Say ping again M*fer!')
				.setCustomId('ping'),
			new MessageButton()
				.setStyle('DANGER')
				.setLabel('Really... fine. Pong..')
				.setCustomId('pong')
		);
		// --------------------- Adding new MessageActionRow().addComponents() will add the buttons on a seperate row level. (See Below).---
		// const pong = new MessageActionRow().addComponents(
		// 	new MessageButton()
		// 		.setStyle('DANGER')
		// 		.setLabel('Really... fine. Pong..')
		// 		.setCustomId('pong')
		// );
		message.reply({
			embeds: [newEmbed],
			components: [ping],
		});
	},
};
