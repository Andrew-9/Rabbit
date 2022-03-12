const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const FiltersSettings = require("../../botconfig/filters.json");
const { check_if_dj } = require("../../handlers/functions");
module.exports = {
	name: "addfilter",
	description: "Add a filter to the filters",
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [ 
		{
			"String": {
				name: "filters",
				description: "Add all filters with a space between, to add!",
				required: true
			}
		}, 
	],
	run: async (client, interaction) => {
		try {
			const { member, guildId, options } = interaction;
			const { guild } = member;
			const { channel } = member.voice;
			let prefix = client.settings.get(guild.id, `prefix`);
			let color = client.settings.get(guild.id, `equalizercolor`);
			let emoji = client.settings.get(guild.id, `emoji`);
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
			content: `**${emoji} Easily use this same command with \`${prefix}add\`**`,
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
			content: `**${emoji} Easily use this same command with \`${prefix}add\`**`,
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
			content: `**${emoji} Easily use this same command with \`${prefix}add\`**`,
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
			content: `**${emoji} Easily use this same command with \`${prefix}add\`**`,
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
			let filters = options.getString("filters").toLowerCase().split(" ");
			if (!filters) filters = [options.getString("filters").toLowerCase()]
			if (filters.some(a => !FiltersSettings[a])) {
			return interaction.reply({
			content: `**${emoji} Easily use this same command with \`${prefix}add\`**`,
			embeds: [
			new MessageEmbed()
			.setColor(color)
			.setTitle(`ONE FILTER IS INVALID!`)
			.setDescription(`
			To define Multiple default Filters add a SPACE (" ") in between! them
			All Valid Filters: ${Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ")}
			NOTE: All filters, starting with custom are having there own Command, please use them to define what custom amount u want!
			`)
			],
			components: [row],
			ephemeral: true
			});
			}
			let toAdded = [];
			//add new filters
			filters.forEach((f) => {
			if (!newQueue.filters.includes(f)) {
			toAdded.push(f)
			}
			})
			if (!toAdded || toAdded.length == 0) {
			return interaction.reply({
			content: `**${emoji} Easily use this same command with \`${prefix}add\`**`,
			embeds: [
			new MessageEmbed()
			.setColor(color)
			.setTitle(`FILTER NOT IN THE FILTERS LIST!`)
			.setDescription(`
			You did not add a filter, which is not in the Filters yet.
			All current filters: ${newQueue.filters.map(f => `\`${f}\``).join(", ")}
			`)
			],
			components: [row],
			ephemeral: true
			});
			}
			await newQueue.setFilter(toAdded);
			interaction.reply({
			content: `**${emoji} Easily use \`${prefix}add\`**`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`FILTER ADDED!`)
			.setDescription(`Added \`${toAdded.length}\` ${toAdded.length == filters.length ? "Filters": `of ${filters.length} filters! The rest was already a part of the filters!`}**`)
			]
			})
			} catch (e) {
			console.log(e.stack ? e.stack : e)
			interaction.editReply({
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