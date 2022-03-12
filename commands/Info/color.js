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
        .setURL(client.global.get("global", "support"))
        .setStyle('LINK')
        .setEmoji('924818382908440606'),

        new MessageButton()
        .setLabel('Vote')
        .setURL(client.global.get("global", "vote"))
        .setStyle('LINK')
        .setEmoji('924819119860224082'),
        )
        let color = args[0];
        if (!color) {
        return message.reply({
        content: "<:attention:924255783695314964> **Provide a \`HEX\` 7 color code!... Eg: \`#FE7B00\`**",
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
        > <:megaphone:925484563952709653> **Notice**
        > **Name:** ${info.name}
        > **Hex:** ${info.hex}
        > **RGB:** ${info.rgb}
        > **Brighter Shade:** ${info.brightened}
        `)
        message.reply({
        content: "**<:rabbitslash:913423874182500352> Try slash command \`/info color\`**",
        embeds: [embed]
        });
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