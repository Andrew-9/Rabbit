const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	name: "ping",
	description: "Gives you information on how fast the Bot is", //the command description for Slash Command Overview
	cooldown: 3,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [
		{
			"StringChoices": {
				name: "type",
				description: "What ping do you want to get?",
				required: false,
				choices: [
					["botping"],
					["Api"]
				]
			}
		},
	],
	run: async (client, interaction) => {
		try {
			const { member, options, createdTimestamp } = interaction;
			const { guild } = member;
			let prefix = client.settings.get(guild.id, "prefix");
			let color = client.settings.get(guild.id, `colorlike`);
			let pointer = client.settings.get(guild.id, `pointer`);
			let emoji = client.settings.get(guild.id, "SlashEmoji");
			const StringOption = options.getString("type");
			if (StringOption) {
				if (StringOption == "botping") {
				interaction.reply({
				content: `**${emoji} Easily use this same command with \`${prefix}ping\`**`,
				embeds: [new MessageEmbed()
				.setColor(color)
				.setTitle(`${client.user.username.toUpperCase()} PONG`)
				.setDescription(`
				${pointer} **Bot Ping:** - \`${Math.floor((Date.now() - createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\`
				`)
				.setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
				]
				});
				}
				//Other Option is API so we are alright
				else {
				interaction.reply({
				content: `**${emoji} Easily use this same command with \`${prefix}ping\`**`,
				embeds: [new MessageEmbed()
				.setColor(color)
				.setTitle(`${client.user.username.toUpperCase()} PONG`)
				.setDescription(`
				${pointer} **Api Ping:** - \`${Math.floor(client.ws.ping)} ms\`
				`)
				.setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
				]
				});
				}
			} else {
				interaction.reply({
				content: `**${emoji} Easily use this same command with \`${prefix}ping\`**`,
				embeds: [new MessageEmbed()
				.setColor(color)
				.setTitle(`${client.user.username.toUpperCase()} PONG`)
				.setDescription(`
				${pointer} **Bot Ping:** - \`${Math.floor((Date.now() - createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\`
				${pointer} **Api Ping:** - \`${Math.floor(client.ws.ping)} ms\`
				`)
				.setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
				]
				});
			}
		} catch (e) {
			console.log(String(e.stack))
		}
	}
}