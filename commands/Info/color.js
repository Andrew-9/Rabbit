const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const pop = require("popcat-wrapper");
module.exports = {
    name: "color",
    category: "Info",
    usage: "color <#FE7B00>",
    aliases: [],
    cooldown: 5,
    description: "Shows information about a color",
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
        let prefix = client.settings.get(message.guild.id, "prefix");
        let i_color = client.settings.get(message.guild.id, `colorlike`);
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
        )
        let color = args[0];
        if (!color) {
        return message.reply({
        content: "🔊 **Provide a \`HEX\` 7 color code!... Eg: \`#FE7B00\`**",
        components: [row]
        });
        } else {
        if (color.includes("#")) {
        color = color.split("#")[1];
        }
        const info = await pop.colorinfo(color);
        const embed = new MessageEmbed()
        .setColor(info.hex)
        .setTitle("COLOR INFORMATION")
        .setThumbnail(info.color_image)
        .setDescription(`
        > 🔊 **Notice**
        > **Name:** ${info.name}
        > **Hex:** ${info.hex}
        > **RGB:** ${info.rgb}
        > **Brighter Shade:** ${info.brightened}
        `)
        message.reply({
        content: "**/ Try slash command \`/info color\`**",
        embeds: [embed]
        });
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