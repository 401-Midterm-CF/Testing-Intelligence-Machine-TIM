const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports ={
    name: buttons,
    descrition: 'button needs',
    run: async (client, message, args) => {
    

    message.channel.send({content: 'Your answers', components:[]})

    }
}