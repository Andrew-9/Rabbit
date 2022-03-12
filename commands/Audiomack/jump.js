const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const wait = require('util').promisify(setTimeout);
const { check_if_dj } = require("../../handlers/functions");
module.exports = {
	name: "jump",
	category: "Audiomack",
	aliases: ["jumpto"],
	usage: "jump <SongPosition>",
	description: "Jumps to a specific song in the queue",
	cooldown: 10,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

	run: async (client, message, args) => {
		try {
			let prefix = client.settings.get(message.guild.id, "prefix");
			let color = client.settings.get(message.guild.id, `audiomack`);
			let emoji = client.settings.get(message.guild.id, `audioemoji`);
			let rabbit = client.settings.get(message.guild.id, `emoji`);
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
			const { member, guildId, guild } = message;
			const { channel } = member.voice;
			if (!channel) {
			return message.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You have to be in a voice channel to use this command!`)
			.setTitle(`NOT IN A VOICE CHANNEL!`)
			],
			components: [row],
			});
			}
			//if user is not in the same voice channel as the bot
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
			return message.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
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
			if(!newQueue)
			if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) {
			return message.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`There's currently nothing playing right now`)
			.setTitle(`NOTHING PLAYING!`)
			],
			components: [row],
			});
			}
			if (check_if_dj(client, member, newQueue.songs[0])) {
			return message.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`NOT THE SONG AUTHOR!`)
			.setDescription(`
			Hmm... You don't seem to be a DJ or the song author
			You need this **dj roles:** ${check_if_dj(client, member, newQueue.songs[0])}
			`)
			],
			components: [row],
			});
			}
			if (!args[0]) {
			return message.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`Please add the song position to which you want to jump to\nFor example \`${prefix}jump <position>\``)
			.setTitle(`ADD A SONG NUMBER!`)
			],
			components: [row],
			});
			}
			let Position = Number(args[0])
			if (Position > newQueue.songs.length - 1 || Position < 0) return message.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [
			new MessageEmbed()
			.setColor(color)
			.setTitle(`USE A SONG NUMBER`)
			.setDescription(`The Position must be between \`0\` and \`${newQueue.songs.length - 1}\``)
			],
			components: [row],
			})
			await newQueue.jump(Position);
			message.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`JUMP SUCCESS!`)
			.setDescription(`Successfully Jumped to the \`${Position}\` song in the queue`)
			]
			})
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
			components: [row],
			})
			}
		} catch (e) {
			console.log(String(e.stack))
		}
	}
}