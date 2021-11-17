module.exports = {
	name: 'balance',
	aliases: ['munnies', 'moneys', 'mullah'],
	description: 'Fetch members moneys & vault values',
	execute(message, args, memberData) {
		message.channel.send(
			`You fumble around in your pocket and find $${memberData.moneys}, You also remember you might have $${memberData.vault} in your vault.`
		);
	},
};
