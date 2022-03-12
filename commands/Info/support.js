const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
    name: "support",
    category: "Info",
    usage: "support",
    aliases: [""],
    cooldown: 2,
    description: "Shows you the support server",
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, message, args) => {
        try {
            let color = client.settings.get(message.guild.id, `colorlike`);
            let pointer = client.settings.get(message.guild.id, `pointer`);
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
            .setEmoji('924819119860224082')
            )
            message.reply({
            content: "**<:rabbitslash:913423874182500352> You can try this with slash command \`/info support\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`${client.user.username.toUpperCase()} SUPPORT SERVER`)
            .setDescription(`
            ${pointer} **Support Server** - [Rabbit Official™](${client.global.get("global", "support")})
            ${pointer} **Development Server** - [Bot Development™](https://discord.gg/Mr3q3dR26b)
            ${pointer} **Pathner Server** - [Tranix Support | Uptime](https://discord.com/invite/zstbC5ftPR)
            `)
            .setThumbnail(client.user.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
            ],
            components: [row]
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