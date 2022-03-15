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
            .setEmoji('🌠'),
            )
            if (!Target) {
            message.reply({
            content: "**/ Try slash command \`/moderation warnings\`**",
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
            content: "**/ Try slash command \`/moderation warnings\`**",
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
              .setTitle(`❌ AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}