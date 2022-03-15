const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { check_if_dj } = require("../../handlers/functions");
module.exports = {
	name: "shuffle",
	description: "Shuffles and mixes the music queue",
	cooldown: 10,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
		try {
			const { member, channelId, guildId, options } = interaction;
			const { guild } = member;
			const { channel } = member.voice;
			let prefix = client.settings.get(guild.id, "prefix");
			let color = client.settings.get(guild.id, `audiomack`);
			let emoji = client.settings.get(guild.id, `audioemoji`);
			let rabbit = client.settings.get(guild.id, `emoji`);
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
			return interaction.reply({
			embeds: [new MessageEmbed()
			.setColor(color)
			.setDescription(`You have to be in a voice channel to use this command!`)
			.setTitle(`${emoji} NOT IN A VOICE CHANNEL!`)
			],
			components: [row],
			ephemeral: true
			});
			}
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
			return interaction.reply({
			content: `**${emoji} Easily use this same command with \`${prefix}shuffle\`**`,
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
			content: `**${emoji} Easily use this same command with \`${prefix}shuffle\`**`,
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
			content: `**${emoji} Easily use this same command with \`${prefix}shuffle\`**`,
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
			await newQueue.shuffle();
			interaction.reply({
			content: `**${emoji} Easily use \`${prefix}shuffle\`**`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`SONG SHUFFLED!`)
			.setDescription(`Successfully shuffled \`${newQueue.songs.length}\` songs!`)
			]
			});
			} catch (e) {
			console.log(e.stack ? e.stack : e);
			interaction.editReply({
			embeds: [
			new MessageEmbed()
			.setColor("#e63064")
			.setTitle("❌ AN ERROR OCCURED!")
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