const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { check_if_dj } = require("../../handlers/functions");
module.exports = {
	name: "stop",
	category: "Audiomack",
	aliases: ["leave", "destroy", "disconnect"],
	usage: "stop",
	description: "Stops playing and leaves the channel!",
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
			let color = client.settings.get(message.guild.id, `audiomack`);
			const { member, guildId, guild } = message;
			const { channel } = member.voice;
			//if user is not in a voice channel
			const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setLabel('Support Server')
				.setURL("https://discord.com/invite/MJ5tYb4Jh9")
				.setStyle('LINK')
				.setEmoji('✈'),
	
				new MessageButton()
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1533303193591&scope=bot%20applications.commands`)
				.setLabel("Invite")
				.setEmoji('💌')
				.setStyle("LINK"),
			
				new MessageButton()
				.setLabel('Vote')
				.setURL("https://top.gg/bot/897819791732121621")
				.setStyle('LINK')
				.setEmoji('🐰'),
			)
			if (!channel) {
			return message.reply({
			content: "**/ Try slash command \`/audiomack skip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You have to be in a voice channel to use this command!`)
			.setTitle(`NOT IN A VOICE CHANNEL!`)
			],
			components: [row]
			});
			}
			//if user is not in the same voice channel as the bot
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
			return message.reply({
			content: "**/ Try slash command \`/audiomack skip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You must be in the same voice channel as me - <#${guild.me.voice.channel.id}>`)
			.setTitle(`NOT IN SAME VOICE!`)
			],
			components: [row]
			});
			}
			try {
			const { member, guildId } = message;
			let newQueue = client.distube.getQueue(guildId);
			if(!newQueue)
			if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) {
			return message.reply({
			content: "**/ Try slash command \`/audiomack skip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`There's currently nothing playing right now`)
			.setTitle(`NOTHING PLAYING!`)
			],
			components: [row]
			});
			}
			if (check_if_dj(client, member, newQueue.songs[0])) {
			return message.reply({
			content: "**/ Try slash command \`/audiomack skip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`NOT THE SONG AUTHOR!`)
			.setDescription(`
			Hmm... You don't seem to be a DJ or the song author
			You need this **dj roles:** ${check_if_dj(client, member, newQueue.songs[0])}
			`)
			],
			components: [row]
			});
			}
			await newQueue.stop();
			return message.reply({
			content: "**/ Try slash command \`/audiomack skip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`DJ **${message.author.username}** stopped the music`)
			.setTitle(`STOPPED SUCCESS!`)
			],
			});
			} catch (e) {
			console.log(e.stack ? e.stack : e)
			message.reply({
			embeds: [
			new MessageEmbed()
			.setColor("#e63064")
			.setTitle("❌ AN ERROR OCCURED!")
			.setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
			.setFooter("Error in code: Report this error to kotlin0427 or _destroyer_#1574")
			],
			})
			}
		} catch (e) {
			console.log(String(e.stack))
		}
	}
}