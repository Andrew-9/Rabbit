const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const FiltersSettings = require("../../botconfig/filters.json");
const { check_if_dj } = require("../../handlers/functions");
module.exports = {
	name: "remove-filter",
	description: "Removes a filter from the queue",
	cooldown: 5,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [
		{
			"String": {
				name: "filters",
				description: "Add all filters with a space between, to remove!",
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

			new MessageButton()
			.setLabel('Instagram')
			.setURL("https://www.instagram.com/fumigramapp")
			.setStyle('LINK')
			.setEmoji('🥰'),
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
			if (!newQueue || !newQueue.songs || newQueue.songs.length == 0){
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
			let filters = options.getString("filters").toLowerCase().split(" ");
			if (!filters) filters = [options.getString("filters").toLowerCase()]
			if (filters.some(a => !FiltersSettings[a])) {
			return interaction.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [
			new MessageEmbed()
			.setColor(color)
			.setTitle(`ONE FILTER IS INVALID!`)
			.setDescription(`
			> To define Multiple default Filters add a SPACE (" ") in between! them

			> ${Object.keys(FiltersSettings).map(f => `\`${f}\``).join(", ")}

			> **Current Filters:** ${newQueue.filters.map(f => `\`${f}\``).join(", ")}
			
			> 🔊 **NOTICE**
			> Filters starting with custom are having there own command.
			> Please use them to define what custom filter to add **(¬‿¬)**
			`)
			],
			components: [row],
			ephemeral: true
			});
			}
			let toRemove = [];
			filters.forEach((f) => {
			if (newQueue.filters.includes(f)) {
			toRemove.push(f)
			}
			});
			if (!toRemove || toRemove.length == 0) {
			return interaction.reply({
			content: `**${rabbit} Drop a review on \`${client.user.username}\` using \`/info feedback\` **`,
			embeds: [
			new MessageEmbed()
			.setColor(color)
			.setTitle(`FILTER IS NOT IN THE LIST!`)
		    .setDescription(`The filter you added is not in the filters list\nAll valid filters: ${newQueue.filters.map(f => `\`${f}\``).join(", ")}`)
			],
			components: [row],
			ephemeral: true
			});
			}
			await newQueue.setFilter(toRemove);
			interaction.reply({
			content: `**${rabbit} Drop a review with \`/info feedback\` **`,
			embeds: [new MessageEmbed()
			.setColor(color)
			.setTitle(`FILTER REMOVED`)
			.setDescription(`Successfully removed \`${toRemove.length}\` \`${toRemove.length == filters.length ? "filters": `of ${filters.length}\` filters! The rest wasn't a part of the filters list!`}`)
		    ]
			});
			} catch (e) {
			console.log(e.stack ? e.stack : e)
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