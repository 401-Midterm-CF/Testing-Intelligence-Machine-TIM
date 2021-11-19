const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fetch = require('node-fetch');
const { addToBank, decreaseFromBank } = require('../guild/updateBank');
const { win, lose } = require('../guild/gamblehelper');

module.exports = {
  name: 'quiz',
  description: 'Quizzing harder everyday',
  async execute(message, args, memberData, wager) {
    //-------checking vault----------//
    if (memberData.moneys <= 0) {
      message.reply(
        'https://tenor.com/view/you-aint-got-no-money-broke-no-money-called-out-real-gif-9727593'
      );
      return;
    }

    //--------grabbing the certain URL per difficulty------//
    const questionRandom = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15'
    );
    const questionEasy = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy'
    );
    const questionMedium = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium'
    );
    const questionHard = await fetch(
      'https://opentdb.com/api.php?amount=10&category=15&difficulty=hard'
    );

    const diff = message.content.split(' ')[1];
    let response = async () => {
      if (
        diff === undefined ||
        diff.toLowerCase() !== 'easy' ||
        diff.toLowerCase() !== 'medium' ||
        diff.toLowerCase() !== 'hard'
      ) {
        const random = await questionRandom.json();
        return random;
      } else if (diff.toLowerCase() === 'easy') {
        const randomEasy = await questionEasy.json();
        return randomEasy;
      } else if (diff.toLowerCase() === 'medium') {
        const randomMedium = await questionMedium.json();
        return randomMedium;
      } else if (diff.toLowerCase() === 'hard') {
        const randomHard = await questionHard.json();
        return randomHard;
      }
    };

    //--------selecting random quesiton------//
    const data = await response();
    var length = data.results.length;
    var randomNum = Math.floor(Math.random() * length);
    var randomQ = data.results[randomNum];
    var question = randomQ.question;
    var difficulty = randomQ.difficulty;

    //--------selecting random answers array------//
    var rightAns = randomQ.correct_answer;
    var wrongAns = randomQ.incorrect_answers;
    var allAns = wrongAns.concat(rightAns);
    const shuffle = (arr) => {
      let currentIndex = arr.length,
        randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], 
		  arr[randomIndex]
		] = [
          arr[randomIndex],
          arr[currentIndex]
        ];
      }
      return arr;
    };
    var answerstoQ = shuffle(allAns);

    //--------changing unicode to punctuation------//
    let messageCheck = (question) => {
      if (question.includes('&quot;')) {
        var newQuestion = question.replace(/&quot;/g, '"');
        return newQuestion;
      } else if (question.includes('&#039')) {
        var newQuestion = question.replace(/&#039;/g, '"');
        return newQuestion;
      } else if (question.includes(';')) {
        var newQuestion = question.replace(/;/g, "'");
        return newQuestion;
      } else if (question.includes('&eacute;')) {
        var newQuestion = question.replace(/&eacute;/g, 'é');
        return newQuestion;
      } else {
        return question;
      }
    };

    //--------setting embedded question & answers------//
    const theQuestion = new MessageEmbed()
      .setColor('#ffff00')
      .setTitle('QuizTime!')
      .setDescription(`${messageCheck(question)}`);
    const myButtons = async (arr) => {
      if (arr.length === 4) {
        const answerButtons = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle('PRIMARY')
            .setLabel(`${arr[0]}`)
            .setCustomId('first'),
          new MessageButton()
            .setStyle('PRIMARY')
            .setLabel(`${arr[1]}`)
            .setCustomId('second'),
          new MessageButton()
            .setStyle('PRIMARY')
            .setLabel(`${arr[2]}`)
            .setCustomId('third'),
          new MessageButton()
            .setStyle('PRIMARY')
            .setLabel(`${arr[3]}`)
            .setCustomId('fourth')
        );
        return answerButtons;
      } else if (arr.length === 2) {
        const answerButtons = new MessageActionRow().addComponents(
          new MessageButton()
            .setStyle('PRIMARY')
            .setLabel(`${arr[0]}`)
            .setCustomId('first'),
          new MessageButton()
            .setStyle('PRIMARY')
            .setLabel(`${arr[1]}`)
            .setCustomId('second')
        );
        return answerButtons;
      }
    };
    // ----- Checking for userClicked is userPosted ----- //
    const filter = (response) => {
      if (response.user.id === message.author.id) {
        return true;
      } else {
        return response.reply({
          content: `You cant play this game, as the game was called by ${message.author.username}. Please use !quiz if you would like to play!`,
        });
      }
    };

    // ----- uses true statement to set timer, and number of buttons that can be clicked ----- //
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 15000,
      max: 1,
    });

    // ----- listens for click, and responds with answer ----- //
    collector.on('collect', async (answerSelected) => {
      if (
        answerSelected.message.components[0].components[0].label === rightAns &&
        answerSelected.customId === 'first'
      ) {
        if (wager) {
          win(wager, memberData);
        } else {
          addToBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was correct!',
          components: [],
        });
      } else if (
        wrongAns.includes(answerSelected.message.components[0].components[0].label) &&
        answerSelected.customId === 'first'
      ) {
        if (wager) {
          win(wager, memberData);
        } else {
          addToBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was incorrect!',
          components: [],
        });
      } else if (
        answerSelected.message.components[0].components[1].label === rightAns &&
        answerSelected.customId === 'second'
      ) {
        if (wager) {
          win(wager, memberData);
        } else {
          addToBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was correct!',
          components: [],
        });
      } else if (
        wrongAns.includes(answerSelected.message.components[0].components[1].label) &&
        answerSelected.customId === 'second'
      ) {
        if (wager) {
          win(wager, memberData);
        } else {
          addToBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was incorrect!',
          components: [],
        });
      } else if (
        answerSelected.message.components[0].components[2].label === rightAns &&
        answerSelected.customId === 'third'
      ) {
        if (wager) {
          win(wager, memberData);
        } else {
          addToBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was correct!',
          components: [],
        });
      } else if (
        wrongAns.includes(answerSelected.message.components[0].components[2].label) &&
        answerSelected.customId === 'third'
      ) {
        if (wager) {
          win(wager, memberData);
        } else {
          addToBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was incorrect!',
          components: [],
        });
      } else if (
        answerSelected.message.components[0].components[3].label === rightAns &&
        answerSelected.customId === 'fourth'
      ) {
        if (wager) {
          win(wager, memberData);
        } else {
          addToBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was correct!',
          components: [],
        });
      } else if (
        wrongAns.includes(answerSelected.message.components[0].components[3].label) &&
        answerSelected.customId === 'fourth'
      ) {
        if (wager) {
          win(wager, memberData);
        } else {
          addToBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was incorrect!',
          components: [],
        });
      } else {
        if (wager) {
          lose(wager, memberData);
        } else {
          decreaseFromBank(difficulty, memberData);
        }
        await answerSelected.update({
          content: 'that answer was incorrect!',
          components: [],
        });
      }
    });

    // ----- end of listener ----- //
    collector.on('end', (collected) => {
      console.log(`Collected ${collected.size} items`);
    });

    // ----- Return to Sender ----- //
    message.reply({
      embeds: [theQuestion],
      components: [await myButtons(answerstoQ)],
    });
  },
};
