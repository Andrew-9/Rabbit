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
            message.reply({
            content: "**/ You can try this with slash command \`/info support\`**",
            embeds: [new MessageEmbed()
            .setColor(color)
            .setTitle(`${client.user.username.toUpperCase()} SUPPORT SERVER`)
            .setDescription(`
            ${pointer} **Support Server** - [Rabbit Official™](https://discord.com/invite/MJ5tYb4Jh9)
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
              .setTitle(`❌ AN ERROR OCCURED!`)
              .setFooter("Error in code: Report this error to kotlin#0427")
              .setDescription(`\`\`\`${e.stack.toString().substr(0, 800)}\`\`\``)
            ]
          });
        }
    }
}