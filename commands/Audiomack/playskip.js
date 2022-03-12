const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { check_if_dj } = require("../../handlers/functions");
const wait = require('util').promisify(setTimeout);
module.exports = {
	name: "playskip",
	category: "Audiomack",
	aliases: ["ps", "playnext"],
	usage: "playskip <Search/link>",
	description: "Play new song and skip the current song",
	cooldown: 2,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
			let prefix = client.settings.get(message.guild.id, "prefix");
			let color = client.settings.get(message.guild.id, `audiomack`);
			let emoji = client.settings.get(message.guild.id, `audioemoji`);
			const { member, guildId, guild } = message;
			const { channel } = member.voice;
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
			if (!channel) {
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack playskip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You have to be in a voice channel to use this command!`)
			.setTitle(`NOT IN A VOICE CHANNEL!`)
			],
			components: [row]
			});
			}
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack playskip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You must be in the same voice channel as me - <#${guild.me.voice.channel.id}>`)
			.setTitle(`NOT IN SAME VOICE!`)
			],
			components: [row]
			});
			}
			if (!args[0]) {
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack playskip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`ADD A MUSIC TO PLAY!`)
			.setDescription(`
			> **<:megaphone:925484563952709653> Notice**
			> **Youtube:** \`${prefix}play\` <youtube link | youtube video name | youtube playlist>
			> **Spotify:** \`${prefix}play\` <spotify song link> | spotify playlist **coming soon**
			`)
			],
			components: [row]
			});
			}
			if (message.member.voice.userLimit != 0 && message.member.voice.full) {
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack playskip\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`Your Voice Channel is full, I'm not able to join it!`)
			.setTitle(`${emoji} NOT ABLE TO SPEAK!`)
			],
			components: [row]
			});
			}
			const Text = args.join(" ")
			let search = await message.reply({ content: `${emoji} **Searching...** \`${Text}\``, components: [row] }).catch(e => { console.log(e) })
			try {
			const { member, channelId, guildId } = message;
			const { guild } = member;
			const { channel } = member.voice;
			let queue = client.distube.getQueue(guildId)
			let options = { member: member, skip: true }
			if (!queue) options.textChannel = guild.channels.cache.get(channelId)
			if (queue) {
			if (check_if_dj(client, member, queue.songs[0])) {
			return message.reply({
			content: "**<:rabbitslash:913423874182500352> Try slash command \`/audiomack playskip\`**",
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
			}
			await client.distube.playVoiceChannel(channel, Text, options)
			search.edit({ content: `${queue?.songs?.length > 0 ? " " + emoji + " **Skipping to:**" : " " + emoji + " **Now Playing:**"} \`${Text}\``, 	components: [row] }).catch(e => { console.log(e) })
			await wait(4000);
			search.delete();
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
			})
			}
		} catch (e) {
		console.log(String(e.stack))
		}
	}
}