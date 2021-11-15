require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
    if (message.content.startsWith('ping!')) {
      message.reply('pong!');
      console.log('hi! i am alive!')
    }
  });
  
  client.on('ready', () => {
     console.log('I am ready!'); 
  });
    
client.login(process.env.DISCORD_BOT_TOKEN);