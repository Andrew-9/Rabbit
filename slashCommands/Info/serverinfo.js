const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
require("moment-duration-format");
module.exports = {
	name: "serverinfo",
    description: "Shows information about the server",
	cooldown: 3,
	memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	run: async (client, interaction) => {
		try {
        const { member, guildId } = interaction;
		const { guild } = member;
        let prefix = client.settings.get(guild.id, "prefix");
        let color = client.settings.get(guild.id, `colorlike`);
        let pointer = client.settings.get(guild.id, `pointer`);
        let Kotlin = client.settings.get(guild.id, `kotlin`);
        let emoji = client.settings.get(guild.id, "SlashEmoji");
        function checkdays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
        }
        if (guild.rulesChannel) {
        rules = "<#" + guild.rulesChannel + ">";
        } else {
        rules = "No channel";
        }
        if (guild.widgetEnabled == "true") {
        widget = "<#" + guild.widgetChannel + ">";
        } else {
        widget = "Not enabled";
        }
        let djs = "";
        if (client.settings.get(guild.id, `djroles`).join("") === "") djs = "No Roles"
        else
        for (let i = 0; i < client.settings.get(guild.id, `djroles`).length; i++) {
        djs += "<@&" + client.settings.get(guild.id, `djroles`)[i] + "> | "
        }
        let owner = await guild.fetchOwner()
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
        content: `**${emoji} Easily use this same command with \`${prefix}serverinfo\`**`,
        embeds: [new MessageEmbed()
        .setColor(color)
        .setTitle(guild.name.toUpperCase())
        .setThumbnail(guild.iconURL({dynamic: true, format: "png", size: 2048}))
        .setDescription(`
        ${pointer} **Prefix** - \`${prefix}\`
        ${pointer} **ID** - \`${guild.id}\`
        ${pointer} **DJ Roles** - ${djs}
        ${pointer} **Owner** - ${owner}
        ${pointer} **Roles** - \`${guild.roles.cache.size}\`
        ${pointer} **Members** - ${guild.memberCount}
        ${pointer} **Channels** - ${guild.channels.cache.size}
        ${pointer} **Emojis** - \`${guild.emojis.cache.size}\`
        ${pointer} **Boosts** - \`${guild.premiumSubscriptionCount}\` [${guild.premiumTier} tier]
        ${pointer} **Members verification** - \`${guild.verificationLevel.toLowerCase()}\`
        ${pointer} **Creation Date** - ${interaction.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkdays(interaction.channel.guild.createdAt)})
        ${pointer} **Guild verified** - ${guild.verified}
        ${pointer} **Discord partner** - ${guild.partnered}
        ${pointer} **Banner** - ${guild.banner || "Not set"}
        ${pointer} **Discovery Splash** - ${guild.discoverySplash || "Not set"}
        ${pointer} **Rules channel** - ${rules}
        ${pointer} **Widget channel** - ${widget}
        ${pointer} **Description** - ${guild.description || "Not set"}
        `)
        .setFooter("Rabbit by Kotlin#0427")
        .setTimestamp()
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