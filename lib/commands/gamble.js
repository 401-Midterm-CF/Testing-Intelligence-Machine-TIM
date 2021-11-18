const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { Client, Intents, Collection} = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
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
    const newEmbed = new MessageEmbed()
      .setColor('#ffff00')
      .setTitle(`${memberData.username} wishes to Gamble`)
      .addFields(
        { name: `Pocket`, value: `$${memberData.moneys}`, inline: true },
        { name: `Vault`, value: `$${memberData.vault}`, inline: true }
      );
    const gambleButtons = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle('PRIMARY')
        .setLabel('Quiz')
        .setCustomId('first')
    );

    const filter = (response) => {
      if (response.user.id === message.author.id) {
        return true;
      } else {
        return response.reply({
          content: `You cant play, as the game was called by ${message.author.username}. Please use !gamble if you would like to play!`,
        });
      }
    };
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 60000,
      max: 1,
    });

    collector.on('collect', async (click) => {
      if ((click.customId = 'first')) {
        await click.update(
          client.commands.get('quiz').execute(message, args, memberData)
        );
      }
    });

    message.reply({
      embeds: [newEmbed],
      components: [gambleButtons],
    });
  },
};
