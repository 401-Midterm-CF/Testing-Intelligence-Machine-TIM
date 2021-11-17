const fetch = require('node-fetch');
const { addToBank, decreaseFromBank } = require('./updateBank.js');

module.exports = {
	name: 'quiz',
	description: 'Quizzing harder everyday',
	async execute(message, args, memberData) {
		if (memberData.vault <= 0) {
			message.reply(
				'https://tenor.com/view/you-aint-got-no-money-broke-no-money-called-out-real-gif-9727593'
			);
			return;
		}
		const response = await fetch(
			'https://opentdb.com/api.php?amount=10&category=15&type=boolean'
		);
		const data = await response.json();
		console.log(data);
		var length = data.results.length;
		var randomNum = Math.floor(Math.random() * length);
		var randomQ = data.results[randomNum];
		var question = randomQ.question;
		var rightAnswer = randomQ.correct_answer;
		var difficulty = randomQ.difficulty;
		// var wrongAnswers = randomQ.incorrect_answers;

		if (question.includes('&quot;')) {
			var newQuestion = question.replace(/&quot;/g, '"');
			message.reply(newQuestion);
		} else if (question.includes('&#039')) {
			var newQuestion = question.replace(/&#039/g, '"');
			message.reply(newQuestion);
		} else if (question.includes(';')) {
			var newQuestion = question.replace(/;/g, '"');
			message.reply(newQuestion);
		} else {
			message.reply(question);
		}
		const filter = (response) => response.author.id === message.author.id;
		try {
			const answer = await message.channel
				.awaitMessages({ filter, maxMatches: 1, time: 10000 })
				.then();
			const userAnswer = answer.first().content;
			if (userAnswer.toLowerCase() === rightAnswer.toLowerCase()) {
				addToBank(difficulty, message.author.id);
				message.reply('Well done, old Chap!');
			} else {
				message.reply('Bullocks, better luck next time old Sport!');
				decreaseFromBank(difficulty, message.author.id);
			}
		} catch (err) {
			message.reply('You ran out of time');
			decreaseFromBank(difficulty, message.author.id);
		}
	},
};
