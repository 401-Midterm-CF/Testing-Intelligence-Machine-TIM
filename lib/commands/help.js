'use strict'
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const beg = require('./beg.js')
const balance = require('./balance.js')
const gamble = require('./gamble.js')
const leave = require('./leave.js')
const ping = require('./ping.js')
const quiz = require('./quiz.js')
const withdrawl = require('./withdrawal.js')

module.exports = {
  name: 'help',
  description: 'Welcomes new user to discord channel',
  execute(message, args, Discord) {
    const welcomeEmbed = new MessageEmbed()
    .setColor('#ffff00')
    .setTitle('Ah Struggling are we comadre? Fear not, we have all the help you need here')
    .addFields(
      {name: `!${beg.name}`, value: `${beg.description}`},
      {name: `!${balance.name}`, value: `${balance.description}`},
      {name: `!${gamble.name}`, value: `${gamble.description}`},
      {name: `!${leave.name}`, value: `${leave.description}`},
      {name: `!${ping.name}`, value: `${ping.description}`},
      {name: `!${quiz.name}`, value: `${quiz.description}`},
      //{name: `${speech.name}`, value: `${speech.description}`},
      {name: `!${withdrawl.name}`, value: `${withdrawl.description}`},
    );
    message.reply({
			embeds: [welcomeEmbed],
		});
  }
}