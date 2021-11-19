const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'balance',
  aliases: ['munnies', 'moneys', 'mullah'],
  description: 'Fetch members moneys & vault values',
  execute(message, args, memberData) {
    // ----- Return User Monetary info ----- //
    const newEmbed = new MessageEmbed()
      .setColor('#ffff00')
      .setTitle(`${memberData.username}'s Bank Statement`)
      .addFields(
        { name: `Wallet`, value: `$${memberData.moneys}`, inline: true },
        { name: `Vault`, value: `$${memberData.vault}`, inline: true }
      );
    // ----- Return to Sender ----- //
    message.reply({
      embeds: [newEmbed],
    });
  },
};
