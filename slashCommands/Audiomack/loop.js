const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { check_if_dj } = require("../../handlers/functions");
module.exports = {
	name: "loop",
	description: "Enable loop for a song or queue",
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [
		{
			"StringChoices": {
				name: "loop",
				description: "What loop do you want to set?",
				required: true,
				choices: [
					["Disable", "0"],
					["Song", "1"],
					["Queue", "2"]
				]
			}
		},
	],
	run: async (client, interaction) => {
		try {
			const { member, guildId, options } = interaction;
			const { guild } = member;
			const { channel } = member.voice;
			let prefix = client.settings.get(guild.id, "prefix");
			let color = client.settings.get(guild.id, `audiomack`);
			let emoji = client.settings.get(guild.id, `audioemoji`);
			let rabbit = client.settings.get(guild.id, `emoji`);
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
			return interaction.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You have to be in a voice channel to use this command!`)
			.setTitle(`NOT IN A VOICE CHANNEL!`)
			],
			components: [row],
			ephemeral: true
			});
			}
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
			return interaction.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You must be in the same voice channel as me - <#${guild.me.voice.channel.id}>`)
			.setTitle(`NOT IN SAME VOICE!`)
			],
			components: [row],
			ephemeral: true
			});
			}
			try {
			let newQueue = client.distube.getQueue(guildId);
			if (!newQueue || !newQueue.songs || newQueue.songs.length == 0) {
			return interaction.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`There's currently nothing playing right now`)
			.setTitle(`NOTHING PLAYING!`)
			],
			components: [row],
			ephemeral: true
			});
			}
			if (check_if_dj(client, member, newQueue.songs[0])) {
			return interaction.reply({
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
			ephemeral: true
			});
			}
			let loop = Number(options.getString("loop"))
			await newQueue.setRepeatMode(loop);
			if (newQueue.repeatMode == 0) {
			interaction.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`DISABLED THE LOOP MODE!`)
			.setDescription(`Successfully Disabled the Loop Mode!`)
			]
			});
			} else if (newQueue.repeatMode == 1) {
			interaction.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`ENABLED THE SONG LOOP MODE!`)
			.setDescription(`Successfully Enabled the \`song\` Loop Mode!`)
			]
			});
			} else {
			interaction.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`ENABLED THE QUEUE LOOP MODE!`)
			.setDescription(`Successfully Enabled the \`queue\` Loop Mode!\nThe \`song\` loop mode has been disabled`)
			]
			});
			}
			} catch (e) {
			console.log(e.stack ? e.stack : e)
			interaction.reply({
			embeds: [
			new MessageEmbed()
			.setColor("#e63064")
			.setTitle("<:errorcode:868245243357712384> AN ERROR OCCURED!")
			.setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
			.setFooter("Error in code: Report this error to kotlin0427")
			],
			ephemeral: true
			});
			}
		} catch (e) {
			console.log(String(e.stack))
		}
	}
}
