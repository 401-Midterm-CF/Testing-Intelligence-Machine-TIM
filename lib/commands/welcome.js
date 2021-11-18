'use strict'
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'welcome',
  description: 'Welcomes new user to discord channel',
  execute(message, args, Discord) {
    console.log(message)
    const welcomeEmbed = new MessageEmbed()
    .setColor('#ffff00')
    .setTitle(`Welcome to ${message.member.guild.name}`)
    .setImage('https://tenor.com/view/welcome-to-the-world-of-tomorrow-futurama-gif-18101283')
    .setDescription(`If you need any assistance you can contact TIM by messaging "!help"`);
    message.reply({
      embeds: [welcomeEmbed],
    });
  }
}