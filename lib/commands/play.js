const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const queue = new Map();

module.exports = {
	name: 'play',
	aliases: ['skip', 'stop'],
	description: 'plays music for you and your friends',
	async execute(message, args, cmd, memberData, Discord) {
		const voice_channel = message.member.voice.channel;
		if (!voice_channel)
			return message.channel.send(
				'You need to be in a channel to listen to the music!'
			);
		const permissions = voice_channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT'))
			return message.channel.send('You dont have the correct permissions');
		if (!permissions.has('SPEAK'))
			return message.channel.send('You dont have the correct permissions');

		const serverQueue = queue.get(message.guild.id);
		if (!args.length)
			return message.channel.send('You need to send the second arguement!');
		let song = {};

		if (ytdl.validateID(args[0])) {
			const song_info = await ytdl.getInfo(args[0]);
			song = {
				title: song_info.videoDetails.title,
				url: song_info.videoDetails.video_url,
			};
		} else {
			const video_finder = async (query) => {
				const videoResult = await ytSearch(query);
				return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
			};
			const video = await video_finder(args.join(' '));
			if (video) {
				song = { title: video.title, url: video.url };
			} else {
				message.channel.send('Error finding video.');
			}
		}
		if (!serverQueue) {
			const queueConstructor = {
				voice_channel: voice_channel,
				text_channel: message.channel,
				connection: null,
				songs: [],
			};
			queue.set(message.guild.id, queueConstructor);
			queueConstructor.songs.push(song);

			try {
				const connection = await voice_channel.join();
				queueConstructor.connection = connection;
				video_player(message.guild, queue_constructor.songs[0]);
			} catch (err) {
				queue.delete(message.guild.id);
				message.channel.send('There was an error connecting :/');
				throw err;
			}
		} else {
			serverQueue.songs.push(song);
			return message.channel.send(`${song.title} has been added to the queue!`);
		}
	},
};

const video_player = async (quild, song) => {
	const songQueue = queue.get(guild.id);

	if (!song) {
		songQueue.voice_channel.leave();
		queue.delete(guild.id);
		return;
	}
	const stream = ytdl(song.url, { filter: 'audioonly' });
	songQueue.connection
		.play(stream, { seek: 0, volume: 0.5 })
		.on('finish', () => {
			song_queue.songs.shift();
			video_player(guild, songQueue.songs[0]);
		});
	await songQueue.text_channel.send(`Now playing ${song.title}`);
};
