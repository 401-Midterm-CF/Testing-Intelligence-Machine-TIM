const fetch = require('node-fetch');

module.exports = {
	name: 'quiz',
	description: 'Quizzing harder everyday',
	async execute(message, args) {
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

		if (question.includes('&quot;')) {
			var newQuestion = question.replace(/&quot;/g, '"');
			message.channel.send(newQuestion);
		} else if (question.includes('&#039')) {
			var newQuestion = question.replace(/&#039/g, '"');
			message.channel.send(newQuestion);
		} else if (question.includes(';')) {
			var newQuestion = question.replace(/;/g, '"');
			message.channel.send(newQuestion);
		} else {
			message.channel.send(question);
		}
		const filter = (response) => response.author.id === message.author.id;
		const answer = await message.channel
			.awaitMessages({ filter, maxMatches: 1, time: 10000 })
			.then();
		const userAnswer = answer.first().content;
		if (userAnswer.toLowerCase() === rightAnswer.toLowerCase()) {
			message.channel.send('You are Correct!');
		} else {
			message.channel.send('Sorry that is incorrect, better luck next time!');
		}
	},
};
