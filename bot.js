// ---- Dependencies ----------
require('dotenv').config();
const mongoose = require('mongoose');
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('TIM to MongoDB, Come-in MongoDB'));

// ----- Discord Dependencies ------
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Collection();

// ---------- Variables -------
const fs = require('fs');
const memberModel = require('./lib/model/memberSchema');
const Token = process.env.DISCORD_BOT_TOKEN;
const prefix = '!';

// --------- Functions -------
const commmandFiles = fs
	.readdirSync('./lib/commands')
	.filter((file) => file.endsWith('.js'));
for (const file of commmandFiles) {
	const command = require(`./lib/commands/${file}`);

	client.commands.set(command.name, command);
}
const addMember = require('./lib/guild/addMember');

// Firing up TIM
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// Channel message commands
client.on('messageCreate', async (message) => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// Add Member if doesnt exist.
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	let memberData;
	if (!message.author.bot) {
		memberData = await memberModel.findOne({
			userID: message.author.id,
		});
		if (!memberData) {
			try {
				memberData = addMember(message);
				profile.save();
			} catch (err) {
				throw err;
			}
		}
	}

	// --------------- Commands ---------------

	// ---- !ping ----
	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	}

	// ---- !quiz ----
	if (command === 'quiz') {
		client.commands.get('quiz').execute(message, args, memberData);
	}
	// ---- !moneys ---- ---> Name in progress

	if (
		command === 'balance' ||
		command === 'mullah' ||
		command === 'moneys' ||
		command === 'munnies'
	) {
		client.commands.get('balance').execute(message, args, memberData);
	}
	if (command === 'pls-sir') {
		client.commands.get('pls-sir').execute(message, args, memberData);
	}
	if (command === 'leave') {
		client.commands.get('leave').execute(message, args);
	}
  if(command === 'welcome'){
    client.commands.get('welcome').execute(message, args)
  }
});
client.login(Token);
