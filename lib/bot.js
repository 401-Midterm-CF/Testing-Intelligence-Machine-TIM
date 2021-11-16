require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const memberModel = require('./model/memberSchema');
const { Client, Intents } = require('discord.js');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const Token = process.env.DISCORD_BOT_TOKEN;
const fetch = require('node-fetch');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
	console.log(message);
	let memberData;
	if (message) {

		memberData = await memberModel.findOne({
			userID: message.author.id,
		});
		console.log(memberData);
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
		console.log(newMember);
	} catch (err) {
		console.log(err);
	}
	}
	}

	if (message.content.startsWith('ping!')) {
		message.reply('pong!');
		console.log('hi! i am alive!');
	}
    if(message.author.bot) return;
    if(message.content.toLowerCase().startsWith("!quiz")){
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=15&type=boolean')
        const data =await response.json();
        var length = data.results.length;
        var randomNum = Math.ceil(Math.random()*length)
        var randomQ = data.results[randomNum]
        var question = randomQ.question;
        var rightAnswer = randomQ.correct_answer;
        var wrongAnswers = randomQ.incorrect_answers;
        console.log(rightAnswer)

        // if (question.includes('&#039') || question.includes('&quot;')){
        //   console.log('found em')
        //   var string = '&#039';
        //   var string2 = '&quot;';
        //   question.replace(string, '\'');
        //   question.replace(string2, '\'');
          console.log(question);
          message.channel.send(`question: ${question} Answers: ${rightAnswer}, ${wrongAnswers}`)
          const filterTrivia = user => user.author.id === message.author.id;
          console.log(filterTrivia)
          const answer = await message.channel.awaitMessages(filterTrivia, {maxMatches: 1, time: 10000, errors: ['time', 'maxMatches']});
          console.log(answer)
          const userAnswer = answer.first();
          console.log(userAnswer)
          if(userAnswer.content.toLowerCase() === rightAnswer.toLowerCase()){
            message.channel.send("You are right!")
          } else {
            message.channel.send("You are wrong?")
          }
        // }
        // console.log(randomQ);
        

        
        // message.channel.se
        // console.log(data.results[0].incorrect_answers)
        // console.log(data.results[0].incorrect_answers)
    }
  });
client.login(Token);
