const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const moment = require("moment");
module.exports = {
    name: "warnings",
    category: "Moderation",
    usage: "warnings <user>",
    aliases: [""],
    cooldown: 5,
	description: "Displays all warnings that a user has",
    memberpermissions: ["MANAGE_MESSAGES"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `modcolor`);
            let rabbitsmirk = client.settings.get(message.guild.id, "rabbitsmirk");
            let emoji = client.settings.get(message.guild.id, "SlashEmoji");
            let pointer = client.settings.get(message.guild.id, `pointer`); 
            const Target = message.mentions.members.first();
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
            if (!Target) {
            message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/moderation warnings\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("NOT A VALID USER")
            .setDescription("The user you want to view their warnings")
            ]
            });
            } else {
            const targetMember = message.guild.members.cache.get(Target.id);
            client.warning.ensure(targetMember.user.id, {  userId: "", userTag: "", guildId: "", moderatorId: "", reason: "", timestamp: "" });
            let userWarnings = client.warning.get(targetMember.user.id, "userId");
            if (userWarnings != Target.id) {
            message.reply({ content: `**${rabbitsmirk} It seems \`${targetMember.user.tag}\` has no warnings**`,  components: [row] });
            } else {
            let WarnTime = client.warning.get(targetMember.user.id, "timestamp");
            message.reply({
            content: "**<:rabbitslash:913423874182500352> Try slash command \`/moderation warnings\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`${targetMember.user.tag.toUpperCase()}'S WARNINGS`)
            .setThumbnail(targetMember.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
            .setDescription(`
            ${pointer} **Warn ID** - ${client.warning.get(targetMember.user.id, "userId")}
            ${pointer} **Moderator** - ${client.warning.get(targetMember.user.id, "moderatorId") || "Has Left Server"}
            ${pointer} **Date** - ${moment(WarnTime).format("MMMM Do YYYY")}
            ${pointer} **Reason** - ${client.warning.get(targetMember.user.id, "reason")}
            `)
            ],
            components: [row]
            })
            }
            }
        } catch (e) {
         console.log(e)
         return message.reply({
            embeds: [new MessageEmbed()
              .setColor("#ff0079")
              .setTitle(`<:errorcode:868245243357712384> AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}