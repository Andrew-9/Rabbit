const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { check_if_dj } = require("../../handlers/functions")
module.exports = {
	name: "clear-filters",
	category: "Equalizer",
	usage: "clear-filter",
	aliases: ["clearfilters", "clearf", "cfilters"],
	description: "Clear all filters from the song",
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, message, args) => {
		try {
			const { member, guildId, guild } = message;
			const { channel } = member.voice;
			let color = client.settings.get(message.guild.id, `equalizercolor`);
			let emoji = client.settings.get(message.guild.id, `emoji`);
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
			content: "**/ Try this with slash command \`/equalizer clear-filters\`**",
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
			content: "**/ Try this with slash command \`/equalizer clear-filters\`**",
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
			content: "**/ Try this with slash command \`/equalizer clear-filters\`**",
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
			content: "**/ Try this with slash command \`/equalizer clear-filters\`**",
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
			await newQueue.setFilter(false);
			message.reply({
			content: "**/ Try \`/equalizer clear-filters\`**",
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`FILTERS CLEARED!`)
			.setDescription(`Successfully cleared all filters!`)
			]
			});
			} catch (e) {
			console.log(e.stack ? e.stack : e)
			message.reply({
			embeds: [
			new MessageEmbed()
			.setColor("#e63064")
			.setTitle("❌ AN ERROR OCCURED!")
			.setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
			.setFooter("Error in code: Report this error to kotlin#0427")
			],
			})
			}
		} catch (e) {
			console.log(String(e.stack))
		}
	}
}