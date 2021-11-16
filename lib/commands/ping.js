module.exports = {
	name: 'ping',
	description: 'I play better ping-pong than forrest Gump!',
	execute(message, args) {
		message.channel.send('pong!');
	},
};
