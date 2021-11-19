'use strict'
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'welcome',
  description: 'Welcomes new user to discord channel',
  execute(message, args, Discord) {
    console.log(message)
    const welcomeEmbed = new MessageEmbed()
    .setColor('#ffff00')
    .setTitle(`Welcome to ${message.member.guild.name}`)
    .setImage('https://cdn.discordapp.com/attachments/908779242538532875/911316653910929448/timmy.jpg')
    .setDescription(`If you need any assistance you can contact TIM by messaging "!help"`);
    message.reply({
      embeds: [welcomeEmbed],
    });
  }
}