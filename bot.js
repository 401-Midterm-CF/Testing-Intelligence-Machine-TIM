require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const memberModel = require('./lib/model/memberSchema');
const { Client, Intents, Collector, Collection } = require('discord.js');
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
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15&type=boolean'
    );
    const data = await response.json();
    var length = data.results.length;
    var randomNum = Math.floor(Math.random() * length);
    var randomQ = data.results[randomNum];
    var question = randomQ.question;
    var rightAnswer = randomQ.correct_answer;
    // var wrongAnswers = randomQ.incorrect_answers;
    console.log(rightAnswer, 'is the correct answer');

    // if (question.includes('&#039') || question.includes('&quot;')){
    //   console.log('found em')
    //   var string = '&#039';
    //   var string2 = '&quot;';
    //   question.replace(string, '\'');
    //   question.replace(string2, '\'');
    console.log(question);
    message.channel.send(question);
    const filter = response => response.author.id === message.author.id;
    const filter2 = response => response.content.includes('discord')
    console.log(filter2())

    const answer = await message.channel.createMessageCollector({filter,
      maxMatches: 1,
      time: 10000,
    });
    // console.log(filterTrivia);
    console.log(answer, '<------the answer');
    Collector.on('collect', m => {
      console.log(`Collected ${m.content}`)
    });
    collector.on('end', collected => {
      console.log(`Collected ${collected.size} items`);
    });
    const userAnswer = answer.first();
    console.log(userAnswer, '<-----My answer');
    if (userAnswer.content.toLowerCase() === rightAnswer.toLowerCase()) {
      message.channel.send('You are right!');
    } else {
      message.channel.send('You are wrong?');
    }
  }
});
client.login(Token);
