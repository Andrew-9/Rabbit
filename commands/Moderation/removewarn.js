const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const moment = require("moment");
module.exports = {
    name: "removewarn",
    category: "Moderation",
    usage: "removewarn <user>",
    aliases: [""],
    cooldown: 5,
	description: "Remove a user's warning",
    memberpermissions: ["MANAGE_MESSAGES"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `modcolor`);
            let rabbitsmirk = client.settings.get(message.guild.id, "rabbitsmirk");
            let emoji = client.settings.get(message.guild.id, "emoji");
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
            )
            if (!Target) {
            message.reply({
            content: "**/ Try slash command \`/moderation removewarn\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle("NOT A VALID USER")
            .setDescription("The user you want to remove their warnings")
            ]
            });
            } else {
            client.warning.ensure(Target.id, {  userId: "", userTag: "", guildId: "", moderatorId: "", reason: "", timestamp: "" });
            let userWarnings = client.warning.get(Target.id, "userId");
            if (userWarnings != Target.id) {
            message.reply({ content: `**${rabbitsmirk} It seems \`${Target.user.tag}\` has no warnings**`,  components: [row] });
            } else {
            client.warning.delete(Target.id, "userId");
            client.warning.delete(Target.id, "userTag");
            client.warning.delete(Target.id, "guildId");
            client.warning.delete(Target.id, "moderatorId");
            client.warning.delete(Target.id, "reason");
            client.warning.delete(Target.id, "timestamp");
            message.reply({
            content: `**${emoji} \`${Target.user.username}'s\` warning has been removed**`,
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