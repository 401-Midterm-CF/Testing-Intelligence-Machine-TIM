'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);


const memberModel = require('./lib/model/memberSchema');
const { Client, Intents, Collection } = require('discord.js');
const prefix = '!';
const fs= require('fs')

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.commands = new Collection();

const commmandFiles = fs.readdirSync('./lib/commands').filter(file => file.endsWith('.js'));
for(const file of commmandFiles){
  const command = require(`./lib/commands/${file}`);

  client.commands.set(command.name, command)
}
const Token = process.env.DISCORD_BOT_TOKEN;
const fetch = require('node-fetch');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
  let memberData
  if (message) {
    memberData = await memberModel.findOne({
      userID: message.author.id,
    });
    if (!memberData) {
      try {
        let newMember = await memberModel.create({
          userID: message.author.id,
          username: message.author.username,
          serverID: message.guildId,
          moneys: 1000,
          vault: 0,
        });
        profile.save();
      } catch (err) {
        console.log(err);
      }
    }
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'ping') {
    client.commands.get('ping').execute(message, args)
  }
  if (command === 'quiz') {
    client.commands.get('quiz').execute(message, args)
  }
});
client.login(Token);
