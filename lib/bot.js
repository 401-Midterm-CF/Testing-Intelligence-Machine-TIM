
require('dotenv').config();


const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
// const config = require('../config.json');
const Token = process.env.DISCORD_BOT_TOKEN
const fetch = require("node-fetch");
const https = require('https')


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', async (message) => {
    if (message.content.startsWith('ping!')) {
      message.reply('pong!');
      console.log('hi! i am alive!')
    }
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith("!quiz")){
        const response = await fetch('https://opentdb.com/api.php?amount=1&category=15')
        console.log(response)
    }
  });
  
client.login(Token);