module.exports = {
	name: 'balance',
	aliases: ['munnies', 'moneys', 'mullah'],
	description: 'Fetch members moneys & vault values',
	execute(message, args, memberData) {
		message.channel.send(
			`Your current balance is ${memberData.moneys}, Your current vault balance is ${memberData.vault}`
		);
	},
};
