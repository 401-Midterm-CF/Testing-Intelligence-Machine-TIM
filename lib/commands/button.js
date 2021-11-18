// const { Client, Message, MessageEmbed} = require('discord.js');
// const { MessageButton } = require('discord-buttons');
// module.exports = {
// 	name: 'button',
// 	description: 'testing button',
//     /**
//      * 
//      * @param {Client} client 
//      * @param {Message} message 
//      * @param {String[]} args 
//      */
// 	run: async (client, message, args) => {
//         const button1 = new MessageButton()
//         .setStyle("gray")
//         .setLabel("Send, 'i am gray'")
//         .setCustomId("button1")

//         const button2 = new MessageButton()
//         .setStyle("red")
//         .setLabel("Send, 'i am red'")
//         .setCustomId("button2")

//         message.channel.send("click this button for your response", {
//             buttons: [button1, button2]
//         })
//     },
// };