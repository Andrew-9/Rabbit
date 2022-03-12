const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "guildavatar",
    category: "Info",
    usage: "guildavatar",
    aliases: [],
    cooldown: 5,
    description: "Get profile picture of the guild",
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let prefix = client.settings.get(message.guild.id, "prefix");
            let color = client.settings.get(message.guild.id, `colorlike`);
            message.reply({
            content: "**<:rabbitslash:913423874182500352> Try this with slash command \`/info avatar\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setImage(message.guild.iconURL({dynamic: true, format: "png", size: 2048 }))
            ],
            components: []
         });
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