const { Client, Intents, Collector, Collection } = require('discord.js');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

module.exports = {
	name: 'leave',
	description: 'leaving so soon; sorry to see you go!',
	execute(message, args) {
		const member = message.mentions.users;
		console.log(member);
		// console.log(message.guild.members.cache.get(member.id))
		client.guilds.cache
			.get(message.guildId)
			.leave()
			.catch((err) => {
				console.log(`there was an error leaving the guild: \n ${err.message}`);
			});
	},
};
