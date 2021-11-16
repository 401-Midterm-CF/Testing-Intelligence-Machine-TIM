const fetch = require('node-fetch');

module.exports = {
    name: 'quiz',
    description: 'Quizzing harder everyday',
    async execute(message, args){
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
      
          // if (question.includes('&#039') || question.includes('&quot;')){
          //   console.log('found em')
          //   var string = '&#039';
          //   var string2 = '&quot;';
          //   question.replace(string, '\'');
          //   question.replace(string2, '\'');
          console.log(question);
          message.channel.send(question);
          const filter = response => response.author.id === message.author.id;
        const answer = await message.channel.awaitMessages({filter,
            maxMatches: 1,
            time: 10000,
          });
          const userAnswer = answer.first().content;
          if (userAnswer.toLowerCase() === rightAnswer.toLowerCase()) {
            message.channel.send('You are right!');
          } else {
            message.channel.send('You are wrong!');
          }
    }
}