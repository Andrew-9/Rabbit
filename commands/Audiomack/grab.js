const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { check_if_dj } = require("../../handlers/functions");
const wait = require('util').promisify(setTimeout);
module.exports = {
	name: "grab",
	category: "Audiomack",
	usage: "grab",
	aliases: ["steal"],
	description: "Saves the current playing song in your DM",
	cooldown: 10,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
			const { member, guildId } = message;
			const { guild } = member;
			const { channel } = member.voice;
			let prefix = client.settings.get(message.guild.id, `prefix`);
			let color = client.settings.get(message.guild.id, `audiomack`);
			let emoji = client.settings.get(message.guild.id, `audioemoji`);
			let rabbit = client.settings.get(message.guild.id, `emoji`);
			let pointer = client.settings.get(message.guild.id, `pointer`);
			const row = new MessageActionRow()
			.addComponents(
			new MessageButton()
			.setURL(client.global.get("global", "invite"))
			.setLabel("Invite")
			.setEmoji('924818034965766215')
			.setStyle("LINK"),
		
			new MessageButton()
			.setLabel('Support Server')
			.setURL(client.global.get("global", "support"))
			.setStyle('LINK')
			.setEmoji('924818382908440606'),
	
			new MessageButton()
			.setLabel('Vote')
			.setURL(client.global.get("global", "vote"))
			.setStyle('LINK')
			.setEmoji('924819119860224082'),
			)
			if (!channel){
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/audiomack grab\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You have to be in a voice channel to use this command!`)
			.setTitle(`NOT IN A VOICE CHANNEL!`)
			],
			components: [row],
			});
			}
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/audiomack grab\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You must be in the same voice channel as me - <#${guild.me.voice.channel.id}>`)
			.setTitle(`NOT IN SAME VOICE!`)
			],
			components: [row],
			});
			}
			try {
			let newQueue = client.distube.getQueue(guildId);
			if (!newQueue || !newQueue.songs || newQueue.songs.length == 0){
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/audiomack grab\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`There's currently nothing playing right now`)
			.setTitle(`NOTHING PLAYING!`)
			],
			components: [row],
			});
			}
			let newTrack = newQueue.songs[0];
			let songtitle = newTrack.name;
			let songName
			if (songtitle.length > 20) songName = songtitle.substr(0, 35) + "...";
			member.send({
			content: `**${emoji} \`${prefix}play\` ${newTrack.url}**`,
			embeds: [
			new MessageEmbed()
			.setAuthor(message.author.tag.toUpperCase(), message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(`https://img.youtube.com/vi/${newTrack.id}/mqdefault.jpg`)
			.setColor(color)
			.setURL(newTrack.url)
			.setDescription(`
			${pointer} **SONG SAVED**
			${pointer} **Song** - \`${songName}\`
			${pointer} **Duration** - \`${newQueue.formattedCurrentTime} / ${newTrack.formattedDuration}\`
			${pointer} **Volume** - \`${newQueue.volume}%\`
			${pointer} **Requested by** -  ${newTrack.user}
			${pointer} **Download Song** - [\`Click here\`](${newTrack.streamURL})
			${pointer} **Watch Music Video** - [\`Watch here\`](${newTrack.url})
			`)
			.setFooter(`${client.user.username}'s audiomack is playing in: ${guild.name}`, guild.iconURL({ dynamic: true }))
			.setTimestamp()
			],
			components: [row],
		    }).then(() => {
			message.delete();
			// message.reply({
			// content: `${emoji} **Song Grabbed! check your Dm!**`,
			// components: [row],
			// })
			}).catch(() => {
			message.reply({
			content: `${emoji} **Oops i can't \`DM\` you for unknown reasons**`,
			components: [row],
			});
			});
			} catch (e) {
			console.log(e.stack ? e.stack : e)
			message.reply({
			embeds: [
			new MessageEmbed()
			.setColor("#e63064")
			.setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
			.setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
			.setFooter("Error in code: Report this error to kotlin0427 or _destroyer_#1574")
			],
			});
			}
		} catch (e) {
			console.log(String(e.stack))
		}
	}
}