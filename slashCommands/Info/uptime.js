const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
	name: "uptime",
	description: "Display's the bot uptime",
	cooldown: 3,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
		try {
        const { member } = interaction;
		const { guild } = member;
        let prefix = client.settings.get(guild.id, "prefix");
        let color = client.settings.get(guild.id, `colorlike`);
        let emoji = client.settings.get(guild.id, "SlashEmoji");
        let pointer = client.settings.get(guild.id, `pointer`);
        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const date = new Date();
        const timestamp = date.getTime() - Math.floor(client.uptime);
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

        new MessageButton()
        .setLabel('Instagram')
        .setURL("https://www.instagram.com/fumigramapp")
        .setStyle('LINK')
        .setEmoji('924819412505223188'),
        )
        interaction.reply({
        content: `**${emoji} Easily use this same command with \`${prefix}uptime\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle(`${client.user.username.toUpperCase()} UPTIME`)
        .setDescription(`
        ${pointer} **Uptime** - \`${duration}\`
        ${pointer} **Date Restarted** - \`${moment(timestamp).format("LLLL")}\`
        `)
        .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
        ],
        components: [row]
        });
		} catch (e) {
        console.log(e.stack ? e.stack : e)
        interaction.editReply({
        embeds: [
        new MessageEmbed()
        .setColor("#ff0079")
        .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
        .setFooter("Error in code: Report this error to kotlin#0427")
        .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
        ],
        });
		}
	}
}