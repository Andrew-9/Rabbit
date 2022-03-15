const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
	name: "invite",
	description: "Invite me to your server",
	cooldown: 1,
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
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Support Server')
            .setURL("https://discord.com/invite/MJ5tYb4Jh9")
            .setStyle('LINK')
            .setEmoji('924818382908440606'),

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
            .setEmoji('🔗'),
        )
        interaction.reply({
        content: `**${emoji} Easily use this same command with \`${prefix}invite\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle(`INVITE ${client.user.username.toUpperCase()}`)
        .setDescription(`
        Invite me to your server using [Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1533303193591&scope=bot%20applications.commands)
        Website for some details about me [Info](https://rabbit.fumigram.com/)
        Vote for me using links [Top.gg](https://top.gg/bot/897819791732121621) | [Discord Boats](https://discord.boats/bot/897819791732121621)
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
        .setTitle(`❌ AN ERROR OCCURED!`)
        .setFooter("Error in code: Report this error to kotlin#0427")
        .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
        ],
        });
		}
	}
}