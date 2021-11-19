// ----- dependencies ----- //
const memberModel = require('../model/memberSchema.js');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// ----- function needed to interact with files ----- //
const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs
	.readdirSync('./lib/commands')
	.filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./${file}`);

	client.commands.set(command.name, command);
}

module.exports = {
	name: 'gamble',
	description: 'Do you feel Lucky?',
	async execute(message, args, memberData) {
		const wager = message.content.split(' ')[1];
		let parsedWager = parseInt(wager);
		const failedWagerEmbed = new MessageEmbed()
			.setColor('#ffff00')
			.setTitle(`${memberData.username}'s Wager Rejected`)
			.setDescription(`CHEATER!`)
			.addFields(
				{ name: `Wager`, value: `$${parsedWager}`, inline: true },
				{ name: `Wallet`, value: `$${memberData.moneys}`, inline: true }
			);
		if (!wager) {
			message.reply({
				content:
					'Please enter a Wager; Example call is as follows... !gamble 500',
			});
			return;
		}
		if (memberData.moneys - parsedWager * 2 < 0) {
			message.reply({
				embeds: [failedWagerEmbed],
			});
			return;
		}
		const newEmbed = new MessageEmbed()
			.setColor('#ffff00')
			.setTitle(`${memberData.username} wishes to Gamble`)
			.addFields(
				{ name: `Pocket`, value: `$${memberData.moneys}`, inline: true },
				{ name: `Vault`, value: `$${memberData.vault}`, inline: true }
			);

		// ----- Buttons for Gambling ----- //
		const gambleButtons = new MessageActionRow().addComponents(
			new MessageButton()
				.setStyle('PRIMARY')
				.setLabel('Quiz')
				.setCustomId('first')
		);
		// ----- Checking for userclicked is userposted ----- //
		const filter = (response) => {
			if (response.user.id === message.author.id) {
				return true;
			} else {
				return response.reply({
					content: `You cant play, as the game was called by ${message.author.username}. Please use !gamble if you would like to play!`,
				});
			}
		};
		// ----- uses true statement to set timer, and number of buttons that can be clicked ----- //
		const collector = message.channel.createMessageComponentCollector({
			filter,
			time: 60000,
			max: 1,
		});
		// ----- connects user to clicked game ----- //
		collector.on('collect', async (click) => {
			if ((click.customId = 'first')) {
				await click.update(
					client.commands
						.get('quiz')
						.execute(message, args, memberData, parsedWager)
				);
			}
		});

		// ----- Return to Sender ----- //
		message.reply({
			embeds: [newEmbed],
			components: [gambleButtons],
		});
	},
};
