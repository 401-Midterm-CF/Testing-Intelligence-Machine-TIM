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
const commandFiles = fs
	.readdirSync('./lib/commands')
	.filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./lib/commands/${file}`);

	client.commands.set(command.name, command);
}
const addMember = require('./lib/guild/addMember');

// ----- Firing up TIM ----- //
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

// ----- Channel message commands ----- //
client.on('messageCreate', async (message) => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	// ----- Add Member if doesnt exist ----- //
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

	// --------------- Commands --------------- //

	// ----- !ping ----- //
	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	}

	// ----- !quiz ----- //
	if (command === 'quiz') {
		if (message.content.split(' ')[1] === undefined) {
			client.commands.get('quiz').execute(message, args, memberData);
		} else {
			client.commands.get('quiz').execute(message, args, memberData, wager);
		}
	}
	// ----- !currency ----- /
	if (
		command === 'balance' ||
		command === 'mullah' ||
		command === 'moneys' ||
		command === 'munnies'
	) {
		client.commands.get('balance').execute(message, args, memberData);
	}
	if (command === 'gamble') {
		// const game = message.content.split(' ')[1];
		client.commands.get('gamble').execute(message, args, memberData);
	}
	if (command === 'pls-sir') {
		client.commands.get('pls-sir').execute(message, args, memberData);
	}
	if (command === 'withdrawal') {
		client.commands.get('withdrawal').execute(message, args, memberData);
	}
	if (command === 'deposit') {
		client.commands.get('deposit').execute(message, args, memberData);
	}
	if (command === 'clear') {
		client.commands.get('clear').execute(message, args, memberData);
	}

	// ----- !userInterface ----- //
	if (command === 'leave') {
		client.commands.get('leave').execute(message, args);
	}
	if (command === 'welcome') {
		client.commands.get('welcome').execute(message, args);
	}
	if (command === 'help') {
		client.commands.get('help').execute(message, args);
	}
});
client.login(Token);
